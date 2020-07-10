/*
 * @Descripttion: 
 * @version: 0.x
 * @Author: zhai
 * @Date: 2020-07-10 09:49:39
 * @LastEditors: zhai
 * @LastEditTime: 2020-07-10 18:11:35
 */ 
import Kernel from '../Kernel';
import Geometry from './Geometry';
import VertexBufferObject from '../VertexBufferObject';

export default class Marker implements Geometry{

    vbo: VertexBufferObject;

    constructor(public x: number, public y: number, public z: number){
     			// kk
			return;
            this.vbo = new VertexBufferObject(Kernel.gl.ARRAY_BUFFER);
        this.vbo.bind();
		this.vbo.bufferData([x,y,z], Kernel.gl.STATIC_DRAW, true);
		// this.vbo.unbind();
    }

    destroy(){
      			// kk
			return;
            this.vbo.destroy();
        this.vbo = null;
    }
}