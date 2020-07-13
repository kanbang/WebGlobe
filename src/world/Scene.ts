/*
 * @Descripttion: 
 * @version: 0.x
 * @Author: zhai
 * @Date: 2020-07-10 09:49:39
 * @LastEditors: zhai
 * @LastEditTime: 2020-07-13 18:16:16
 */ 
import {Pickable} from './Definitions.d';
import GraphicGroup,{PickableGraphicGroup} from './GraphicGroup';
import TiledLayer from './layers/TiledLayer';
import Line from './math/Line';
import { Drawable } from './graphics/Drawable';

export default class Scene extends GraphicGroup<Drawable>{
    tiledLayer: TiledLayer;

    pickByWorldLine(worldLine: Line){
        const count = this.children.length;
        for(let i = count - 1; i >= 0; i--){
            let graphicGroup = this.children[i];
            if(graphicGroup instanceof PickableGraphicGroup){
                let pickableGraphicGroup = graphicGroup as PickableGraphicGroup<Drawable & Pickable>;
                const target = pickableGraphicGroup.pickByWorldLine(worldLine, true);
                if(target){
                    return target;
                }
            }
        }
        return null;
    }
};