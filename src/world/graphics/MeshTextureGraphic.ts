import Kernel from '../Kernel';
import Program from '../Program';
import Graphic from './Graphic';
import Mesh from '../geometries/Mesh';
import MeshTextureMaterial from '../materials/MeshTextureMaterial';
import Camera from '../Camera';
import Line from '../math/Line';
import { Drawable, Pickable, Attributes } from '../Definitions.d';

import * as BABYLON from "babylonjs"


const vs =
    `
attribute vec3 aPosition;
attribute vec2 aUV;
varying vec2 vUV;
uniform mat4 uPMVMatrix;

void main()
{
	gl_Position = uPMVMatrix * vec4(aPosition,1.0);
	vUV = aUV;
}
`;

const fs =
    `
precision mediump float;
varying vec2 vUV;
uniform sampler2D uSampler;

void main()
{
	gl_FragColor = texture2D(uSampler, vec2(vUV.s, vUV.t));
}
`;

export default class MeshTextureGraphic extends Graphic implements Pickable {
    mesh: BABYLON.Mesh = null;

    constructor(public geometry: Mesh, public material: MeshTextureMaterial, public attributes: Attributes = null) {
        super(geometry, material, attributes);
        this.geometry.calculateVBO();
        this.geometry.calculateIBO();
        this.geometry.calculateUVBO();
        console.log("**MeshTextureGraphic: "
            // , this.id
        )


        // this.makeBaby();

    }

    makeBaby() {
        if (this.mesh) {
            return;
        }

        // if (this.id != 16)
        //     return;

        var baby = Kernel.baby;
        var scene = baby.scene;

        var vertexData = new BABYLON.VertexData();

        //Assign positions and indices to vertexData

        var length = this.geometry.vertices.length;
        vertexData.positions = new Float32Array(length * 3);
        for (var i = 0; i < length; i++) {
            var vertex = this.geometry.vertices[i];
            vertexData.positions[i * 3] = vertex.p[0];
            vertexData.positions[i * 3 + 1] = vertex.p[1];
            vertexData.positions[i * 3 + 2] = vertex.p[2];
        }

        length = this.geometry.triangles.length;
        vertexData.indices = new Int32Array(length * 3);
        for (var i = 0, length = this.geometry.triangles.length; i < length; i++) {
            var triangle = this.geometry.triangles[i];
            vertexData.indices[i * 3] = triangle.v1.i;
            vertexData.indices[i * 3 + 2] = triangle.v2.i;
            vertexData.indices[i * 3 + 1] = triangle.v3.i;
        }


        var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
        materialPlane.diffuseTexture = new BABYLON.Texture('data:my_image_name', scene, true,
                                                           true, BABYLON.Texture.BILINEAR_SAMPLINGMODE,
                                                           null, null, this.material.image, true);
        // materialPlane.diffuseTexture.uScale = 5.0;//Repeat 5 times on the Vertical Axes
        // materialPlane.diffuseTexture.vScale = 5.0;//Repeat 5 times on the Horizontal Axes
        materialPlane.backFaceCulling = false;//Allways show the front and the back of an element

        // var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
        // myMaterial.bumpTexture = new BABYLON.Texture(null, scene, null, null, null, null, null, this.material.image);
        // // myMaterial.invertNormalMapX = true;
        // myMaterial.invertNormalMapY = true;
        


        //法线设置
        // var normals = [];
        // VertexData.ComputeNormals(geometry.vertices, geometry.indices, normals);
        // // BABYLON.VertexData._ComputeSides(BABYLON.Mesh.FRONTSIDE, geometry.vertices, geometry.indices, normals, uvs);


        this.mesh = new BABYLON.Mesh("xbimmesh" + this.id, scene);
        this.mesh.material = materialPlane;

        //Apply vertexData to custom mesh
        vertexData.applyToMesh(this.mesh, true);
        console.log("**BabylonMesh: "
            , "id: ", this.id
            , "length: ", length
            // , this.id
        )

    }

    isGeometryReady(): boolean {
        // kk
        return !!this.geometry;

        return !!this.geometry.vbo && !!this.geometry.ibo && !!this.geometry.uvbo;
    }

    isReady(): boolean {
        // kk
        return this.isGeometryReady();
        return this.isGeometryReady() && super.isReady();
    }

    static findProgram(): Program {
        return Program.findProgram(vs, fs);
    }

    createProgram(): Program {
        return Program.getProgram(vs, fs);
    }

    protected updateShaderUniforms(camera: Camera) {
        //uPMVMatrix
        var gl = Kernel.gl;

        // kk
        return;

        var pmvMatrix = camera.getProjViewMatrixForDraw().multiplyMatrix(this.geometry.getMatrix());
        var locPMVMatrix = this.program.getUniformLocation('uPMVMatrix');
        gl.uniformMatrix4fv(locPMVMatrix, false, pmvMatrix.getFloat32Array());

        //uSampler
        gl.activeTexture(Kernel.gl.TEXTURE0);
        var locSampler = this.program.getUniformLocation('uSampler');
        gl.uniform1i(locSampler, 0);
    }

    protected onDraw(camera: Camera) {


        // debugger
        this.makeBaby();


        return;

        var gl = Kernel.gl;

        this.updateShaderUniforms(camera);

        //aPosition
        var locPosition = this.program.getAttribLocation('aPosition');
        this.program.enableVertexAttribArray('aPosition');
        this.geometry.vbo.bind();
        //一个aPosition由3个Kernel.gl.FLOAT组成
        gl.vertexAttribPointer(locPosition, 3, Kernel.gl.FLOAT, false, 0, 0);

        //set aUV
        var locUV = this.program.getAttribLocation('aUV');
        this.program.enableVertexAttribArray('aUV');
        this.geometry.uvbo.bind();
        //一个aUV由2个Kernel.gl.FLOAT组成
        gl.vertexAttribPointer(locUV, 2, Kernel.gl.FLOAT, false, 0, 0);

        //set uSampler
        gl.bindTexture(Kernel.gl.TEXTURE_2D, this.material.texture);

        //设置索引，但不用往shader中赋值
        this.geometry.ibo.bind();

        //绘图
        var count = this.geometry.triangles.length * 3;
        //count为所绘制的点的数量
        gl.drawElements(Kernel.gl.TRIANGLES, count, Kernel.gl.UNSIGNED_SHORT, 0);

        //释放当前绑定对象
        // gl.bindBuffer(gl.ARRAY_BUFFER, null);
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        // gl.bindTexture(gl.TEXTURE_2D, null);
    }

    ifIntersectLocalLine(localLine: Line): boolean {
        if (this.geometry) {
            return this.geometry.ifIntersectLocalLine(localLine);
        }
        return false;
    }

    ifIntersectWorldLine(worldLine: Line): boolean {
        if (this.geometry) {
            return this.geometry.ifIntersectWorldLine(worldLine);
        }
        return false;
    }
};