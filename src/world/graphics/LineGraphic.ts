/*
 * @Descripttion: 
 * @version: 0.x
 * @Author: zhai
 * @Date: 2020-07-10 09:49:39
 * @LastEditors: zhai
 * @LastEditTime: 2020-07-13 19:00:41
 */
import Kernel from '../Kernel';
import Program from '../Program';
import Graphic from './Graphic';
import Line from '../geometries/Line';
import ColorMaterial from '../materials/ColorMaterial';
import Camera from '../Camera';

const vs =
    `
attribute vec3 aPosition;
uniform vec3 uColor;
varying vec4 vColor;
uniform mat4 uPMVMatrix;

void main(void)
{
    gl_Position = uPMVMatrix * vec4(aPosition, 1.0);
    vColor = vec4(uColor,1.0);
}
`;

const fs =
    `
#ifdef GL_ES
precision highp float;
#endif

varying vec4 vColor;

void main(void) {
    gl_FragColor = vColor;
}
`;


export default class LineGraphic extends Graphic {
    constructor(public geometry: Line, public material: ColorMaterial, public lineWidth: number = 1) {
        super(geometry, material);
    }

    isReady() {
        return this.geometry.isReady();
    }



    onDraw(camera: Camera): boolean {
        // kk
        return super.onDraw(camera);
        // const gl = Kernel.gl;

        // //uPMVMatrix
        // var pmvMatrix = camera.getProjViewMatrixForDraw();//.multiplyMatrix(this.geometry.getMatrix());
        // var locPMVMatrix = this.program.getUniformLocation('uPMVMatrix');
        // gl.uniformMatrix4fv(locPMVMatrix, false, pmvMatrix.getFloat32Array());

        // //aPosition
        // var locPosition = this.program.getAttribLocation('aPosition');
        // this.program.enableVertexAttribArray('aPosition');
        // this.geometry.vbo.bind();
        // gl.vertexAttribPointer(locPosition, 3, Kernel.gl.FLOAT, false, 0, 0);

        // //uColor
        // var locColor = this.program.getUniformLocation('uColor');
        // gl.uniform3fv(locColor, this.material.color);

        // //绘图
        // gl.lineWidth(this.lineWidth);
        // gl.drawArrays(gl.LINE_STRIP, 0, this.geometry.getVerticeCount());
    }
}