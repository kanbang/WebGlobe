/*
 * @Descripttion: 
 * @version: 0.x
 * @Author: zhai
 * @Date: 2020-07-10 10:11:33
 * @LastEditors: zhai
 * @LastEditTime: 2020-07-10 16:08:03
 */


import * as BABYLON from "babylonjs"


export default class Baby {

    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
    camera: BABYLON.ArcRotateCamera;

    constructor(canvas: HTMLCanvasElement) {
        this.initBabylon(canvas);
    }


    private initBabylon(canvas: HTMLCanvasElement) {
        // 实例化3d引擎
        this.engine = new BABYLON.Engine(canvas, true);

        // 创建场景
        this.createScene(canvas);

        // 循环渲染，性能最大没秒六十帧
        this.engine.runRenderLoop( ()=> {
            this.scene.render();
        });

        // 浏览器大小变动时，触发引擎的重载状态
        // window.addEventListener('resize', function () {
        //   this.engine.resize();
        // });
    }

    // 创建场景并返回场景对象
    private createScene(canvas: HTMLCanvasElement) {
        // 创建场景对象
        this.scene = new BABYLON.Scene(this.engine);

// x: 393.9710656589913
// y: 255.2004468485344
// z: -177.99695100507927

        // 创建FreeCamera, 并把相机位置设置到(x:0, y:5, z:-10)
        this.camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 0, new BABYLON.Vector3(2000, 0, 0), this.scene);
        this.camera.maxZ = 10000;
        this.camera.minZ = 10;
        this.camera.wheelPrecision = 0.1;

        // 将相机朝向设置到原点
        this.camera.setTarget(BABYLON.Vector3.Zero());

        // 相机事件绑定到canvas对象上面
        this.camera.attachControl(canvas, false);

        // 创建一个平衡光，将灯光位置设置到0 1 0
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);

        // 创建一个球题 支持六个配置项 名称, 分割段数, 直径, 放置的场景, updatable, sideOrientation
        var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 50, this.scene);

        // 创建地面
        var ground = BABYLON.Mesh.CreateGround('ground1', 100, 100, 2, this.scene);
        ground.position.y = -100 / 2;

    };
};
