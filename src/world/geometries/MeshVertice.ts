/*
 * @Descripttion: 
 * @version: 0.x
 * @Author: zhai
 * @Date: 2020-07-10 09:49:39
 * @LastEditors: zhai
 * @LastEditTime: 2020-07-13 17:13:52
 */ 
export default class MeshVertice{
	p:number[];
	n:number[];
	uv:number[];
	c:number[];
	i:number;

	constructor(args:any){
		this.i = args.i;//index
		this.p = args.p;//[x,y,z]
		this.uv = args.uv;//[s,t]

		// debugger
		this.n = args.n;//[x,y,z]
		this.c = args.c;//[r,g,b]
	}

	clone(){
		var args: any = {};
		args.i = this.i;
		args.p = [...this.p];
		args.uv = [...this.uv];
		args.n = [...this.n];
		args.c = [...this.c];
		return new MeshVertice(args);
	}
};