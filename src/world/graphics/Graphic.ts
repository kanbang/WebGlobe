/*
 * @Descripttion: 
 * @version: 0.x
 * @Author: zhai
 * @Date: 2020-07-10 09:49:39
 * @LastEditors: zhai
 * @LastEditTime: 2020-07-13 18:30:21
 */ 
import Kernel from '../Kernel';
import {Attributes} from '../Definitions.d';
import Geometry from '../geometries/Geometry';
import Material from '../materials/Material';
import Program from '../Program';
import Camera from '../Camera';
import GraphicGroup from '../GraphicGroup';
import { Drawable } from './Drawable';

abstract class Graphic extends Drawable{
    id: number;
    visible: boolean = true;
    parent: GraphicGroup<Drawable>;

    constructor(public geometry: Geometry = null, public material: Material = null, public attributes: Attributes = null){
        super();

        this.id = ++Kernel.idCounter;
        this.parent = null;
    }

    setVisible(visible: boolean){
        this.visible = visible;
    }


    isReady(): boolean{
        return !!(this.geometry && this.material && this.material.isReady());
    }

    shouldDraw(camera: Camera): boolean{
        return this.visible && this.isReady();
    }

    destroy(){
        this.parent = null;
        if(this.geometry){
            this.geometry.destroy();
        }
        if(this.material){
            this.material.destroy();
        }
        this.geometry = null;
        this.material = null;
    }
}

export default Graphic;