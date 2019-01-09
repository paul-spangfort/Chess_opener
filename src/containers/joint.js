// The joint class represents a joint and its attached bone.
// The joint is attached at `position' relative to its parent and spins around `jointAxis'
function pCube(cube){
	var string = ''

	var n = Math.sqrt(cube.m.length)

	var i = 0;
	console.log('in here')
	console.log(cube)

	while (i < n) {
		string = string + cube.m.slice(i, i + 1) + '\n'
		i += 1
	}

	console.log(string)
}

var Joint = function(parent, position, jointAxis, length, name, gl)
{
	this.mParent = parent;
  this.mPosition = position;
  this.mJointAxis = jointAxis;
  this.mJointAngle = 0;
	this.mName = name;
	this.mLength = length;

	// The binding matrix stores the orientation of the bone at the time it was attached to the skin
  // This matrix is null until the bone is attached to the skin
	this.mBindingMatrix = null;

	this.gl = gl;
    var shader = createShaderProgram(gl, SolidVertexSource, SolidFragmentSource);
	// Create a cube mesh to represent the joint
	this.mesh = new TriangleMesh(this.gl, CubePositions, CubeIndices, shader, true, true, new Vector(0.4, 0.7, 0.4), new Vector(0.5, 1, 0.5));
}

// Helper functions.
Joint.prototype.setJointAngle = function(angle) {
    this.mJointAngle = angle;
}

Joint.prototype.setName = function(val) {
	this.mName = val;
}

// NOTE: if the skeleton has not been attached to the skin yet, this returns null
Joint.prototype.getBindingMatrix = function() {
	return this.mBindingMatrix;
}

Joint.prototype.getName = function() {
	return this.mName;
}

// TODO: Task 1 - Subtask 1
//
// Returns the local transform of the current joint
// This matrix should rotate by `this.mJointAngle' around `this.mJointAxis'
// and then translate by `this.mPosition'
// Hint: mJointAxis and mPosition are vector objects. You can get their components using
//       mJointAxis.x, mJointAxis.y, etc.
Joint.prototype.getLocalMatrix = function() {

	var tMatrix = Matrix.translate(this.mPosition.x, this.mPosition.y, this.mPosition.z)
	var rMatrix = Matrix.rotate(this.mJointAngle,this.mJointAxis.x,this.mJointAxis.y, this.mJointAxis.z)

	var lMatrix = Matrix.multiply(tMatrix, rMatrix);

	return lMatrix;
}

// TODO: Task 1 - Subtask 1
//
// Returns the world transform of the current joint.
// This is simply the transform of the parent joint (if any) multiplied by this joint's local transform
// Use the getLocalMatrix function you implemented earlier.
Joint.prototype.getWorldMatrix = function() {
	var parentTransforms = [];
	var current = this;
	var localMatrix = this.getLocalMatrix();
	var worldMatrix = 0;
	var newMatrix = new Matrix();

	while (current.mParent) {

		// Push parents local matrix
		parentTransforms.push(current.mParent.getLocalMatrix());
		current = current.mParent;

	}

	var i = 1;

	// If it has parents, find world matrix
	if (parentTransforms.length != 0){

		worldMatrix = parentTransforms[0]

			while (i < parentTransforms.length){

				var currTransform = parentTransforms[i]
				worldMatrix = Matrix.multiply(currTransform, worldMatrix)

				i += 1;

			}
	}

	if (worldMatrix != 0){
		newMatrix = Matrix.multiply(worldMatrix, localMatrix)
	} else {
		newMatrix = localMatrix
	}
    return newMatrix;
}

// TODO: Task 1 - Subtask 1
//
// Compute the binding transform matrix of the joint.
// Hint: The binding matrix transforms points from world space to the local space of the joint
//       Use getWorldMatrix and a matrix inverse.
Joint.prototype.computeBindingMatrix = function() {

	var wMatrix = this.getWorldMatrix();
	var lMatrix = this.getLocalMatrix();

	var wiMatrix = Matrix.inverse(wMatrix);
	var liMatrix = Matrix.inverse(lMatrix);

// ################ Edit your code below
    this.mBindingMatrix = wiMatrix;
// ################

}

// Returns the end points of the joint in world space
// Can be used to compute the distance to the line segment
// The returned values are 'v0' and 'v1'
Joint.prototype.getJointEndPoints = function() {
	return {
        v0 : this.getWorldMatrix().transformPoint(new Vector(0, 0, 0)),
        v1 : this.getWorldMatrix().transformPoint(new Vector(this.mLength, 0, 0))
    };
}

// Computes the model matrix used to draw the joint.
Joint.prototype.computeModelMatrix = function() {
    var pose = this.getWorldMatrix();
	// Do a scaling about the origin of the cube for the correct size
	var sMatrix = Matrix.scale(this.mLength, 0.2, 0.2);
	// And then offset it to coincide with the joint
	var tMatrix = Matrix.translate(this.mLength/2, 0, 0);
    return pose.multiply(tMatrix.multiply(sMatrix));
}

// Renders the joint as a cube
Joint.prototype.render = function(gl, view, projection)
{
	this.mModelMatrix = this.computeModelMatrix();
	this.mesh.render(gl, this.mModelMatrix, view, projection);
}
