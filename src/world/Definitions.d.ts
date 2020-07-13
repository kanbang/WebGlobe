/*
 * @Descripttion: 
 * @version: 0.x
 * @Author: zhai
 * @Date: 2020-07-10 09:49:39
 * @LastEditors: zhai
 * @LastEditTime: 2020-07-13 18:02:51
 */
declare const Promise: any;
import Line from './math/Line';
import Matrix from './math/Matrix';
import Camera from './Camera';
import GraphicGroup from './GraphicGroup';

interface WebGLProgramExtension extends WebGLProgram {
    uMVMatrix: WebGLUniformLocation;
    uPMatrix: WebGLUniformLocation;
    uSampler: WebGLUniformLocation;
    uOffScreen: WebGLUniformLocation;
    aVertexPosition: number;
    aTextureCoord: number;
}

export interface WebGLRenderingContextExtension extends WebGLRenderingContext {
    shaderProgram: WebGLProgramExtension;
}

export interface IMockCamera {
    fov: number;
    aspect: number;
    near: number;
    far: number;
    realLevel: number;
    matrix: Matrix;
    equals(other: IMockCamera): boolean;
}


export interface Pickable {
    ifIntersectLocalLine(localLine: Line): boolean;
    ifIntersectWorldLine(worldLine: Line): boolean;
}

export type PickListener = (target: Pickable) => void;

export interface CancelablePromise extends Promise<any> {
    cancel: () => void;
}

export interface Destroyable {
    destroy: () => void;
}

export interface Attributes {
    [key: string]: any
}

// declare module "*.png" {
//   const content: any;
//   export default content;
// }

// declare function require(path: string): string;