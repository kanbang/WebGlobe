import Kernel from './Kernel';
import Utils from './Utils';
import Renderer from './Renderer';
import Camera, { CameraCore } from './Camera';
import Scene from './Scene';
import ImageUtils from './Image';
import EventHandler from './EventHandler';
import TiledLayer from './layers/TiledLayer';
import { GoogleTiledLayer } from './layers/Google';
import { AutonaviTiledLayer, AutonaviLabelLayer } from './layers/Autonavi';
import LabelLayer from './layers/LabelLayer';
import TrafficLayer from './layers/TrafficLayer';
// import { QihuTrafficLayer } from './layers/Qihu';
import Atmosphere from './graphics/Atmosphere';
import PoiLayer from './layers/PoiLayer';
import RouteLayer from './layers/RouteLayer';
import Extent from './Extent';
import { WebGLRenderingContextExtension } from './Definitions.d';
import { devicePixelRatio } from './Env';

import Baby from './Baby';

const initLevel: number = Utils.isMobile() ? 11 : 3;

const initLonlat: number[] = [116.3975, 39.9085];

type RenderCallback = () => void;

export class GlobeOptions {
  pauseRendering: boolean = false;
  satellite: boolean = true;
  level: number | 'auto' = 'auto';
  lonlat: number[] | 'auto' = 'auto';
  key: string = "";
  resolutionFactor: number;
}

export default class Globe {
  baby: Baby = null;


  renderer: Renderer = null;
  scene: Scene = null;
  camera: Camera = null;
  tiledLayer: TiledLayer = null;
  labelLayer: LabelLayer = null;
  trafficLayer: TrafficLayer = null;
  poiLayer: PoiLayer = null;
  routeLayer: RouteLayer = null;
  //locationGraphic: LocationGraphic = null;
  debugStopRefreshTiles: boolean = false;
  private readonly REFRESH_INTERVAL: number = 150; //Globe自动刷新时间间隔，以毫秒为单位
  private lastRefreshTimestamp: number = -1;
  private lastRefreshCameraCore: CameraCore = null;
  private eventHandler: EventHandler = null;
  private allRefreshCount: number = 0;
  private realRefreshCount: number = 0;
  private width: number = 0;
  private height: number = 0;
  // private beforeRenderCallbacks: RenderCallback[] = [];
  private afterRenderCallbacks: RenderCallback[] = [];
  public gl: WebGLRenderingContextExtension = null;
  private static globe: Globe = null;

  static getInstance(options?: GlobeOptions) {
    if (!this.globe) {
      const canvas = document.createElement("canvas");
      const width: number = document.documentElement.clientWidth;
      const height: number = document.documentElement.clientHeight;
      this.globe = new Globe(canvas, width, height, options);
    }
    return this.globe;
  }

  private constructor(public canvas: HTMLCanvasElement, width: number, height: number, private options?: GlobeOptions) {
    this.baby = new Baby(canvas);
    Kernel.baby = this.baby;


    // return;

    if (!this.options) {
      this.options = new GlobeOptions();
    }
    this.resizeCanvas(width, height);
    this.renderer = new Renderer(canvas, this._onBeforeRender.bind(this), this._onAfterRender.bind(this));
    this.gl = this.renderer.gl;
    this.scene = new Scene();
    const radio = this.width / this.height;
    let level = this.options.level >= 0 ? (this.options.level as number) : initLevel;
    let lonlat = (this.options.lonlat && this.options.lonlat.length === 2) ? (this.options.lonlat as number[]) : initLonlat;
    this.camera = new Camera(width, height, 30, radio, 1, Kernel.EARTH_RADIUS * 2, level, lonlat, options.resolutionFactor);
    this.renderer.setScene(this.scene);
    this.renderer.setCamera(this.camera);

    var cameraPositon = this.camera.getPosition(); //摄像机的世界坐标


    this.baby.scene.registerBeforeRender(()=>{

      // this.camera.

    })


    if (this.options.satellite) {
      //not display well for level 10,11 when style is Default
      this._setTiledLayer(new GoogleTiledLayer("Default"), this.options.pauseRendering);//"Default" | "Satellite" | "Road" | "RoadOnly" | "Terrain" | "TerrainOnly";
      // this.labelLayer = new AutonaviLabelLayer();
      // this.labelLayer = new SosoLabelLayer();
      // this.scene.add(this.labelLayer);
    } else {
      this._setTiledLayer(new AutonaviTiledLayer(), this.options.pauseRendering);
    }

    var atmosphere = Atmosphere.getInstance();
    this.scene.add(atmosphere);

    this.eventHandler = new EventHandler(this);

    if (this.options.pauseRendering !== true) {
      this.renderer.resumeRendering();
    }
  }

  placeAt(container: HTMLElement) {
    if (this.canvas.parentNode) {
      if (this.canvas.parentNode !== container) {
        container.appendChild(this.canvas);
      }
    } else {
      container.appendChild(this.canvas);
    }
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public resize(width: number, height: number) {
    this.resizeCanvas(width, height);
    this.renderer.updateViewportSize();
    // this.camera.setAspect(width / height);
    this.camera.setSize(width, height);
    Utils.publish("extent-change");
  }

  private resizeCanvas(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width * devicePixelRatio;
    this.canvas.height = height * devicePixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
  }

  getLonlat() {
    return this.camera.getLonlat();
  }

  isRenderingPaused() {
    return this.renderer.isRenderingPaused();
  }

  pauseRendering() {
    this.renderer.pauseRendering();
  }

  resumeRendering() {
    this.renderer.resumeRendering();
    this.refresh(true);
  }

  private _setTiledLayer(tiledLayer: TiledLayer, dontRefresh: boolean = false) {
    //在更换切片图层的类型时清空缓存的图片
    ImageUtils.clear();
    if (this.tiledLayer) {
      var b = this.scene.remove(this.tiledLayer);
      if (!b) {
        console.error("this.scene.remove(this.tiledLayer)失败");
      }
      this.scene.tiledLayer = null;
    }
    tiledLayer.globe = this;
    this.tiledLayer = tiledLayer;
    this.scene.add(this.tiledLayer, true);
    if (!dontRefresh) {
      this.refresh(true);
    }
  }

  showLabelLayer() {
    if (this.labelLayer) {
      this.labelLayer.visible = true;
    }
  }

  hideLabelLayer() {
    if (this.labelLayer) {
      this.labelLayer.visible = false;
    }
  }

  showTrafficLayer() {
    if (this.trafficLayer) {
      this.trafficLayer.visible = true;
    }
  }

  hideTrafficLayer() {
    if (this.trafficLayer) {
      this.trafficLayer.visible = false;
    }
  }

  getLevel() {
    return this.camera.getLevel();
  }

  zoomIn() {
    this.setLevel(this.getLevel() + 1);
  }

  setLevel(level: number) {
    if (this.camera) {
      this.camera.setLevel(level);
    }
  }

  centerTo(lon: number, lat: number, level: number = this.getLevel()) {
    return this.camera.centerTo(lon, lat, level);
  }

  animateTo(newLon: number, newLat: number, newLevel: number = this.getLevel(), duration: number = 1000) {
    return this.camera.animateTo(newLon, newLat, newLevel, duration);
  }

  setExtent(extent: Extent) {
    return this.camera.setExtent(extent);
  }

  animateToExtent(extent: Extent, duration: number = 1000) {
    return this.camera.animateToExtent(extent, duration);
  }

  isAnimating(): boolean {
    return this.camera.isAnimating();
  }

  animateToLevel(level: number, cb?: () => void) {
    if (!this.isAnimating()) {
      if (level < Kernel.MIN_LEVEL) {
        level = Kernel.MIN_LEVEL;
      }
      if (level > Kernel.MAX_LEVEL) {
        level = Kernel.MAX_LEVEL;
      }
      if (level !== this.getLevel()) {
        this.camera.animateToLevel(level, cb);
      }
    }
  }

  animateOut(cb?: () => void) {
    this.animateToLevel(this.getLevel() - 1, cb);
  }

  animateIn(cb?: () => void) {
    this.animateToLevel(this.getLevel() + 1, cb);
  }

  private _onBeforeRender(renderer: Renderer) {
    // this.beforeRenderCallbacks.forEach((callback) => callback());
    this.refresh();
  }

  private _onAfterRender(render: Renderer) {
    this.afterRenderCallbacks.forEach((callback) => callback());
    this.afterRenderCallbacks = [];
  }

  logRefreshInfo() {
    console.log(this.realRefreshCount, this.allRefreshCount, this.realRefreshCount / this.allRefreshCount);
  }

  refresh(force: boolean = false) {
    this.allRefreshCount++;
    var timestamp = Date.now();

    //先更新camera中的各种矩阵
    this.camera.update(force);

    if (!this.tiledLayer || !this.scene || !this.camera) {
      return;
    }

    if (this.debugStopRefreshTiles) {
      return;
    }

    var newCameraCore = this.camera.getCameraCore();
    // var isNeedRefresh = force || !newCameraCore.equals(this.cameraCore);
    var isNeedRefresh = false;
    if (force) {
      isNeedRefresh = true;
    } else {
      if (this.isRenderingPaused()) {
        //when rendering paused, we don't need to refresh
        isNeedRefresh = false;
      } else {
        if (newCameraCore.equals(this.lastRefreshCameraCore)) {
          isNeedRefresh = false;
        } else {
          isNeedRefresh = timestamp - this.lastRefreshTimestamp >= this.REFRESH_INTERVAL;
        }
      }
    }

    this.tiledLayer.updateSubLayerCount();

    if (isNeedRefresh) {
      this.realRefreshCount++;
      this.lastRefreshTimestamp = timestamp;
      this.lastRefreshCameraCore = newCameraCore;
      this.tiledLayer.refresh();
    }

    this.tiledLayer.updateTileVisibility();

    if (!this.isRenderingPaused()) {
      var a = !!(this.labelLayer && this.labelLayer.visible);
      var b = !!(this.trafficLayer && this.trafficLayer.visible);
      if (a || b) {
        var lastLevelTileGrids = this.tiledLayer.getLastLevelVisibleTileGrids();
        if (a) {
          this.labelLayer.updateTiles(this.getLevel(), lastLevelTileGrids);
        }
        if (b) {
          this.trafficLayer.updateTiles(this.getLevel(), lastLevelTileGrids);
        }
      }
    }
  }

  getExtent() {
    const extents: Extent[] = [];
    //layerExtent is null when rendering paused
    var layerExtent = this.tiledLayer.getExtent();
    if (layerExtent) {
      extents.push(layerExtent);
    }

    var cameraExtent = this.camera.getExtent();
    if (cameraExtent) {
      extents.push(cameraExtent);
    }

    if (extents.length === 0) {
      return null;
    } else if (extents.length === 1) {
      return extents[0];
    } else {
      return Extent.intersect(extents);
    }
  }

  pick(canvasX: number, canvasY: number) {
    const pickInfo = this.camera.getPickInfoByCanvas(canvasX, canvasY, false);
    const line = pickInfo.line;
    this.scene.pickByWorldLine(line);
  }

  test() {
    this.debugStopRefreshTiles = true;
    this.labelLayer.hideAllTiles();
    this.tiledLayer.children.forEach((subLayer) => subLayer.hideAllTiles());
    var subLayer = this.tiledLayer.children[this.tiledLayer.children.length - 1];
    subLayer.visible = true;
    subLayer.children[0].visible = true;
    return subLayer;
  }

};