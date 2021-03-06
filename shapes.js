w=a.width=innerWidth
h=a.height=innerHeight
g=a.getContext('webgl')||a.getContext('experimental-webgl')
g.enable(g.DEPTH_TEST)
g.depthFunc(g.LEQUAL)

$prog(g,[vertexShader,fragmentShader])
pos=$attr("pos")
triBuf=$buf([0,1,0,-1,-1,0,1,-1,0])
quadBuf=$buf([1,1,0,-1,1,0,1,-1,0,-1,-1,0])
P=perspective(45,w/h,0.1,100)
MV=mI()

~function scene(time) {
	time/=1e3
	// function to set the uniforms
	unis=function(){
		$uni("time",time)
		$uniV("resolution",[w,h])
		$uniM("MV",MV)
		$uniM("P",P)
	}
	// clear screen
	g.clearColor(1/5,1/5,1/5,1)
	g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT)

	// draw trigon
	MV=mT(-1.5,0,-7)
	$bind(pos,triBuf,3)
	unis()
	g.drawArrays(g.TRIANGLE_STRIP,0,3)

	// draw square
	MV=mT(1.5,0,-7)
	$bind(pos,quadBuf,3)
	unis()
	g.drawArrays(g.TRIANGLE_STRIP,0,4)

	requestAnimationFrame(scene)
}(0)
