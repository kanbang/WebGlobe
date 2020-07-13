/*
 * @Descripttion: 
 * @version: 0.x
 * @Author: zhai
 * @Date: 2020-07-13 18:12:35
 * @LastEditors: zhai
 * @LastEditTime: 2020-07-13 18:59:58
 */
import GraphicGroup from "../GraphicGroup";
import Camera from '../Camera';


export abstract class Drawable {
    id: number;
    parent: GraphicGroup<Drawable>;
    should_draw: boolean = false;

    constructor() {
    }

    draw(camera: Camera): void {
        this.onDraw(camera, this.shouldDraw(camera));
    };

    abstract shouldDraw(camera: Camera): boolean;

 
    /**
     * @description
     * @param {Camera} camera
     * @param {boolean} should_draw
     * @returns {boolean} 显示状态是否有变化，是否需要继续执行
     * @memberof Drawable
     */
    onDraw(camera: Camera, should_draw: boolean): boolean {
        if (this.should_draw != should_draw) {
            this.should_draw = should_draw;
            return true;
        }

        return false;
    }
    
    abstract destroy(): void;
}