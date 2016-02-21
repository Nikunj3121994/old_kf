// Type definitions for gl-matrix 2.2.2
// Project: https://github.com/toji/gl-matrix
// Definitions by: Tat <https://github.com/tatchx>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface IArray {
	/**
	 * Must be indexable like an array
	 */
	[index: number]: number;
}

// Common
export interface glMatrix {
	/**
	 * Convert Degree To Radian
	 *
	 * @param a Angle in Degrees
	 */
	toRadian(a: number): number;
}

// vec2
export interface vec2 {
	/**
	 * Creates a new, empty vec2
	 *
	 * @returns a new 2D vector
	 */
	create(): IArray;

	/**
	 * Creates a new vec2 initialized with values from an existing vector
	 *
	 * @param a a vector to clone
	 * @returns a new 2D vector
	 */
	clone(a: IArray): IArray;

	/**
	 * Creates a new vec2 initialized with the given values
	 *
	 * @param x X component
	 * @param y Y component
	 * @returns a new 2D vector
	 */
	fromValues(x: number, y: number): IArray;

	/**
	 * Copy the values from one vec2 to another
	 *
	 * @param out the receiving vector
	 * @param a the source vector
	 * @returns out
	 */
	copy(out: IArray, a: IArray): IArray;

	/**
	 * Set the components of a vec2 to the given values
	 *
	 * @param out the receiving vector
	 * @param x X component
	 * @param y Y component
	 * @returns out
	 */
	set(out: IArray, x: number, y: number): IArray;

	/**
	 * Adds two vec2's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	add(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	subtract(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	sub(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Multiplies two vec2's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	multiply(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Multiplies two vec2's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	mul(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Divides two vec2's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	divide(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Divides two vec2's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	div(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Returns the minimum of two vec2's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	min(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Returns the maximum of two vec2's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	max(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Scales a vec2 by a scalar number
	 *
	 * @param out the receiving vector
	 * @param a the vector to scale
	 * @param b amount to scale the vector by
	 * @returns out
	 */
	scale(out: IArray, a: IArray, b: number): IArray;

	/**
	 * Adds two vec2's after scaling the second operand by a scalar value
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @param scale the amount to scale b by before adding
	 * @returns out
	 */
	scaleAndAdd(out: IArray, a: IArray, b: IArray, scale: number): IArray;

	/**
	 * Calculates the euclidian distance between two vec2's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns distance between a and b
	 */
	distance(a: IArray, b: IArray): number;

	/**
	 * Calculates the euclidian distance between two vec2's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns distance between a and b
	 */
	dist(a: IArray, b: IArray): number;

	/**
	 * Calculates the squared euclidian distance between two vec2's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns squared distance between a and b
	 */
	squaredDistance(a: IArray, b: IArray): number;

	/**
	 * Calculates the squared euclidian distance between two vec2's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns squared distance between a and b
	 */
	sqrDist(a: IArray, b: IArray): number;

	/**
	 * Calculates the length of a vec2
	 *
	 * @param a vector to calculate length of
	 * @returns length of a
	 */
	length(a: IArray): number;

	/**
	 * Calculates the length of a vec2
	 *
	 * @param a vector to calculate length of
	 * @returns length of a
	 */
	len(a: IArray): number;

	/**
	 * Calculates the squared length of a vec2
	 *
	 * @param a vector to calculate squared length of
	 * @returns squared length of a
	 */
	squaredLength(a: IArray): number;

	/**
	 * Calculates the squared length of a vec2
	 *
	 * @param a vector to calculate squared length of
	 * @returns squared length of a
	 */
	sqrLen(a: IArray): number;

	/**
	 * Negates the components of a vec2
	 *
	 * @param out the receiving vector
	 * @param a vector to negate
	 * @returns out
	 */
	negate(out: IArray, a: IArray): IArray;

	/**
	 * Returns the inverse of the components of a vec2
	 *
	 * @param out the receiving vector
	 * @param a vector to invert
	 * @returns out
	 */
	inverse(out: IArray, a: IArray): IArray;

	/**
	 * Normalize a vec2
	 *
	 * @param out the receiving vector
	 * @param a vector to normalize
	 * @returns out
	 */
	normalize(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the dot product of two vec2's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns dot product of a and b
	 */
	dot(a: IArray, b: IArray): number;

	/**
	 * Computes the cross product of two vec2's
	 * Note that the cross product must by definition produce a 3D vector
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	cross(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Performs a linear interpolation between two vec2's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @param t interpolation amount between the two inputs
	 * @returns out
	 */
	lerp(out: IArray, a: IArray, b: IArray, t: number): IArray;

	/**
	 * Generates a random unit vector
	 *
	 * @param out the receiving vector
	 * @returns out
	 */
	random(out: IArray): IArray;

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param out the receiving vector
	 * @param scale Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns out
	 */
	random(out: IArray, scale: number): IArray;

	/**
	 * Transforms the vec2 with a mat2
	 *
	 * @param out the receiving vector
	 * @param a the vector to transform
	 * @param m matrix to transform with
	 * @returns out
	 */
	transformMat2(out: IArray, a: IArray, m: IArray): IArray;

	/**
	 * Transforms the vec2 with a mat2d
	 *
	 * @param out the receiving vector
	 * @param a the vector to transform
	 * @param m matrix to transform with
	 * @returns out
	 */
	transformMat2d(out: IArray, a: IArray, m: IArray): IArray;

	/**
	 * Transforms the vec2 with a mat3
	 * 3rd vector component is implicitly '1'
	 *
	 * @param out the receiving vector
	 * @param a the vector to transform
	 * @param m matrix to transform with
	 * @returns out
	 */
	transformMat3(out: IArray, a: IArray, m: IArray): IArray;

	/**
	 * Transforms the vec2 with a mat4
	 * 3rd vector component is implicitly '0'
	 * 4th vector component is implicitly '1'
	 *
	 * @param out the receiving vector
	 * @param a the vector to transform
	 * @param m matrix to transform with
	 * @returns out
	 */
	transformMat4(out: IArray, a: IArray, m: IArray): IArray;

	/**
	 * Perform some operation over an array of vec2s.
	 *
	 * @param a the array of vectors to iterate over
	 * @param stride Number of elements between the start of each vec2. If 0 assumes tightly packed
	 * @param offset Number of elements to skip at the beginning of the array
	 * @param count Number of vec2s to iterate over. If 0 iterates over entire array
	 * @param fn Function to call for each vector in the array
	 * @param arg additional argument to pass to fn
	 * @returns a
	 */
	forEach(a: IArray, stride: number, offset: number, count: number,
	                        fn: (a: IArray, b: IArray, arg: any) => void, arg: any): IArray;

	/**
	 * Perform some operation over an array of vec2s.
	 *
	 * @param a the array of vectors to iterate over
	 * @param stride Number of elements between the start of each vec2. If 0 assumes tightly packed
	 * @param offset Number of elements to skip at the beginning of the array
	 * @param count Number of vec2s to iterate over. If 0 iterates over entire array
	 * @param fn Function to call for each vector in the array
	 * @returns a
	 */
	forEach(a: IArray, stride: number, offset: number, count: number,
	                        fn: (a: IArray, b: IArray) => void): IArray;

	/**
	 * Returns a string representation of a vector
	 *
	 * @param vec vector to represent as a string
	 * @returns string representation of the vector
	 */
	str(a: IArray): string;
}

// vec3
export interface vec3 {

	/**
	 * Creates a new, empty vec3
	 *
	 * @returns a new 3D vector
	 */
	create(): IArray;

	/**
	 * Creates a new vec3 initialized with values from an existing vector
	 *
	 * @param a vector to clone
	 * @returns a new 3D vector
	 */
	clone(a: IArray): IArray;

	/**
	 * Creates a new vec3 initialized with the given values
	 *
	 * @param x X component
	 * @param y Y component
	 * @param z Z component
	 * @returns a new 3D vector
	 */
	fromValues(x: number, y: number, z: number): IArray;

	/**
	 * Copy the values from one vec3 to another
	 *
	 * @param out the receiving vector
	 * @param a the source vector
	 * @returns out
	 */
	copy(out: IArray, a: IArray): IArray;

	/**
	 * Set the components of a vec3 to the given values
	 *
	 * @param out the receiving vector
	 * @param x X component
	 * @param y Y component
	 * @param z Z component
	 * @returns out
	 */
	set(out: IArray, x: number, y: number, z: number): IArray;

	/**
	 * Adds two vec3's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	add(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	subtract(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	sub(out: IArray, a: IArray, b: IArray): IArray

	/**
	 * Multiplies two vec3's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	multiply(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Multiplies two vec3's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	mul(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Divides two vec3's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	divide(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Divides two vec3's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	div(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Returns the minimum of two vec3's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	min(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Returns the maximum of two vec3's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	max(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Scales a vec3 by a scalar number
	 *
	 * @param out the receiving vector
	 * @param a the vector to scale
	 * @param b amount to scale the vector by
	 * @returns out
	 */
	scale(out: IArray, a: IArray, b: number): IArray;

	/**
	 * Adds two vec3's after scaling the second operand by a scalar value
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @param scale the amount to scale b by before adding
	 * @returns out
	 */
	scaleAndAdd(out: IArray, a: IArray, b: IArray, scale: number): IArray;

	/**
	 * Calculates the euclidian distance between two vec3's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns distance between a and b
	 */
	distance(a: IArray, b: IArray): number;

	/**
	 * Calculates the euclidian distance between two vec3's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns distance between a and b
	 */
	dist(a: IArray, b: IArray): number;

	/**
	 * Calculates the squared euclidian distance between two vec3's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns squared distance between a and b
	 */
	squaredDistance(a: IArray, b: IArray): number;

	/**
	 * Calculates the squared euclidian distance between two vec3's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns squared distance between a and b
	 */
	sqrDist(a: IArray, b: IArray): number;

	/**
	 * Calculates the length of a vec3
	 *
	 * @param a vector to calculate length of
	 * @returns length of a
	 */
	length(a: IArray): number;

	/**
	 * Calculates the length of a vec3
	 *
	 * @param a vector to calculate length of
	 * @returns length of a
	 */
	len(a: IArray): number;

	/**
	 * Calculates the squared length of a vec3
	 *
	 * @param a vector to calculate squared length of
	 * @returns squared length of a
	 */
	squaredLength(a: IArray): number;

	/**
	 * Calculates the squared length of a vec3
	 *
	 * @param a vector to calculate squared length of
	 * @returns squared length of a
	 */
	sqrLen(a: IArray): number;

	/**
	 * Negates the components of a vec3
	 *
	 * @param out the receiving vector
	 * @param a vector to negate
	 * @returns out
	 */
	negate(out: IArray, a: IArray): IArray;

	/**
	 * Returns the inverse of the components of a vec3
	 *
	 * @param out the receiving vector
	 * @param a vector to invert
	 * @returns out
	 */
	inverse(out: IArray, a: IArray): IArray;

	/**
	 * Normalize a vec3
	 *
	 * @param out the receiving vector
	 * @param a vector to normalize
	 * @returns out
	 */
	normalize(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the dot product of two vec3's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns dot product of a and b
	 */
	dot(a: IArray, b: IArray): number;

	/**
	 * Computes the cross product of two vec3's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	cross(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Performs a linear interpolation between two vec3's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @param t interpolation amount between the two inputs
	 * @returns out
	 */
	lerp(out: IArray, a: IArray, b: IArray, t: number): IArray;

	/**
	 * Generates a random unit vector
	 *
	 * @param out the receiving vector
	 * @returns out
	 */
	random(out: IArray): IArray;

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param out the receiving vector
	 * @param [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns out
	 */
	random(out: IArray, scale: number): IArray;

	/**
	 * Rotate a 3D vector around the x-axis
	 * @param out The receiving vec3
	 * @param a The vec3 point to rotate
	 * @param b The origin of the rotation
	 * @param c The angle of rotation
	 * @returns out
	 */
	rotateX(out: IArray, a: IArray, b: IArray, c: number): IArray;

	/**
	 * Rotate a 3D vector around the y-axis
	 * @param out The receiving vec3
	 * @param a The vec3 point to rotate
	 * @param b The origin of the rotation
	 * @param c The angle of rotation
	 * @returns out
	 */
	rotateY(out: IArray, a: IArray, b: IArray, c: number): IArray;

	/**
	 * Rotate a 3D vector around the z-axis
	 * @param out The receiving vec3
	 * @param a The vec3 point to rotate
	 * @param b The origin of the rotation
	 * @param c The angle of rotation
	 * @returns out
	 */
	rotateZ(out: IArray, a: IArray, b: IArray, c: number): IArray;

	/**
	 * Transforms the vec3 with a mat3.
	 *
	 * @param out the receiving vector
	 * @param a the vector to transform
	 * @param m the 3x3 matrix to transform with
	 * @returns out
	 */
	transformMat3(out: IArray, a: IArray, m: IArray): IArray;

	/**
	 * Transforms the vec3 with a mat4.
	 * 4th vector component is implicitly '1'
	 *
	 * @param out the receiving vector
	 * @param a the vector to transform
	 * @param m matrix to transform with
	 * @returns out
	 */
	transformMat4(out: IArray, a: IArray, m: IArray): IArray;

	/**
	 * Transforms the vec3 with a quat
	 *
	 * @param out the receiving vector
	 * @param a the vector to transform
	 * @param q quaternion to transform with
	 * @returns out
	 */
	transformQuat(out: IArray, a: IArray, q: IArray): IArray;


	/**
	 * Perform some operation over an array of vec3s.
	 *
	 * @param a the array of vectors to iterate over
	 * @param stride Number of elements between the start of each vec3. If 0 assumes tightly packed
	 * @param offset Number of elements to skip at the beginning of the array
	 * @param count Number of vec3s to iterate over. If 0 iterates over entire array
	 * @param fn Function to call for each vector in the array
	 * @param arg additional argument to pass to fn
	 * @returns a
	 * @function
	 */
	forEach(out: IArray, string: number, offset: number, count: number,
	                        fn: (a: IArray, b: IArray, arg: any) => void, arg: any): IArray;

	/**
	 * Perform some operation over an array of vec3s.
	 *
	 * @param a the array of vectors to iterate over
	 * @param stride Number of elements between the start of each vec3. If 0 assumes tightly packed
	 * @param offset Number of elements to skip at the beginning of the array
	 * @param count Number of vec3s to iterate over. If 0 iterates over entire array
	 * @param fn Function to call for each vector in the array
	 * @returns a
	 * @function
	 */
	forEach(out: IArray, string: number, offset: number, count: number,
	                        fn: (a: IArray, b: IArray) => void): IArray;

	/**
	 * Get the angle between two 3D vectors
	 * @param a The first operand
	 * @param b The second operand
	 * @returns The angle in radians
	 */
	angle(a: IArray, b: IArray): number;

	/**
	 * Returns a string representation of a vector
	 *
	 * @param vec vector to represent as a string
	 * @returns string representation of the vector
	 */
	str(a: IArray): string;
}

// vec4
export interface vec4 {

	/**
	 * Creates a new, empty vec4
	 *
	 * @returns a new 4D vector
	 */
	create(): IArray;

	/**
	 * Creates a new vec4 initialized with values from an existing vector
	 *
	 * @param a vector to clone
	 * @returns a new 4D vector
	 */
	clone(a: IArray): IArray;

	/**
	 * Creates a new vec4 initialized with the given values
	 *
	 * @param x X component
	 * @param y Y component
	 * @param z Z component
	 * @param w W component
	 * @returns a new 4D vector
	 */
	fromValues(x: number, y: number, z: number, w: number): IArray;

	/**
	 * Copy the values from one vec4 to another
	 *
	 * @param out the receiving vector
	 * @param a the source vector
	 * @returns out
	 */
	copy(out: IArray, a: IArray): IArray;

	/**
	 * Set the components of a vec4 to the given values
	 *
	 * @param out the receiving vector
	 * @param x X component
	 * @param y Y component
	 * @param z Z component
	 * @param w W component
	 * @returns out
	 */
	set(out: IArray, x: number, y: number, z: number, w: number): IArray;

	/**
	 * Adds two vec4's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	add(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	subtract(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	sub(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Multiplies two vec4's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	multiply(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Multiplies two vec4's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	mul(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Divides two vec4's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	divide(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Divides two vec4's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	div(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Returns the minimum of two vec4's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	min(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Returns the maximum of two vec4's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	max(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Scales a vec4 by a scalar number
	 *
	 * @param out the receiving vector
	 * @param a the vector to scale
	 * @param b amount to scale the vector by
	 * @returns out
	 */
	scale(out: IArray, a: IArray, b: number): IArray;

	/**
	 * Adds two vec4's after scaling the second operand by a scalar value
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @param scale the amount to scale b by before adding
	 * @returns out
	 */
	scaleAndAdd(out: IArray, a: IArray, b: IArray, scale: number): IArray;

	/**
	 * Calculates the euclidian distance between two vec4's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns distance between a and b
	 */
	distance(a: IArray, b: IArray): number;

	/**
	 * Calculates the euclidian distance between two vec4's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns distance between a and b
	 */
	dist(a: IArray, b: IArray): number;

	/**
	 * Calculates the squared euclidian distance between two vec4's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns squared distance between a and b
	 */
	squaredDistance(a: IArray, b: IArray): number;

	/**
	 * Calculates the squared euclidian distance between two vec4's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns squared distance between a and b
	 */
	sqrDist(a: IArray, b: IArray): number;

	/**
	 * Calculates the length of a vec4
	 *
	 * @param a vector to calculate length of
	 * @returns length of a
	 */
	length(a: IArray): number;

	/**
	 * Calculates the length of a vec4
	 *
	 * @param a vector to calculate length of
	 * @returns length of a
	 */
	len(a: IArray): number;

	/**
	 * Calculates the squared length of a vec4
	 *
	 * @param a vector to calculate squared length of
	 * @returns squared length of a
	 */
	squaredLength(a: IArray): number;

	/**
	 * Calculates the squared length of a vec4
	 *
	 * @param a vector to calculate squared length of
	 * @returns squared length of a
	 */
	sqrLen(a: IArray): number;

	/**
	 * Negates the components of a vec4
	 *
	 * @param out the receiving vector
	 * @param a vector to negate
	 * @returns out
	 */
	negate(out: IArray, a: IArray): IArray;

	/**
	 * Returns the inverse of the components of a vec4
	 *
	 * @param out the receiving vector
	 * @param a vector to invert
	 * @returns out
	 */
	inverse(out: IArray, a: IArray): IArray;

	/**
	 * Normalize a vec4
	 *
	 * @param out the receiving vector
	 * @param a vector to normalize
	 * @returns out
	 */
	normalize(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the dot product of two vec4's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns dot product of a and b
	 */
	dot(a: IArray, b: IArray): number;

	/**
	 * Performs a linear interpolation between two vec4's
	 *
	 * @param out the receiving vector
	 * @param a the first operand
	 * @param b the second operand
	 * @param t interpolation amount between the two inputs
	 * @returns out
	 */
	lerp(out: IArray, a: IArray, b: IArray, t: number): IArray;

	/**
	 * Generates a random unit vector
	 *
	 * @param out the receiving vector
	 * @returns out
	 */
	random(out: IArray): IArray;

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param out the receiving vector
	 * @param Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns out
	 */
	random(out: IArray, scale: number): IArray;

	/**
	 * Transforms the vec4 with a mat4.
	 *
	 * @param out the receiving vector
	 * @param a the vector to transform
	 * @param m matrix to transform with
	 * @returns out
	 */
	transformMat4(out: IArray, a: IArray, mat: IArray): IArray;

	/**
	 * Transforms the vec4 with a quat
	 *
	 * @param out the receiving vector
	 * @param a the vector to transform
	 * @param q quaternion to transform with
	 * @returns out
	 */
	transformQuat(out: IArray, a: IArray, quat: IArray): IArray;

	/**
	 * Perform some operation over an array of vec4s.
	 *
	 * @param a the array of vectors to iterate over
	 * @param stride Number of elements between the start of each vec4. If 0 assumes tightly packed
	 * @param offset Number of elements to skip at the beginning of the array
	 * @param count Number of vec4s to iterate over. If 0 iterates over entire array
	 * @param fn Function to call for each vector in the array
	 * @param additional argument to pass to fn
	 * @returns a
	 * @function
	 */
	forEach(out: IArray, string: number, offset: number, count: number,
	                        callback: (a: IArray, b: IArray, arg: any) => void, arg: any): IArray;

	/**
	 * Perform some operation over an array of vec4s.
	 *
	 * @param a the array of vectors to iterate over
	 * @param stride Number of elements between the start of each vec4. If 0 assumes tightly packed
	 * @param offset Number of elements to skip at the beginning of the array
	 * @param count Number of vec4s to iterate over. If 0 iterates over entire array
	 * @param fn Function to call for each vector in the array
	 * @returns a
	 * @function
	 */
	forEach(out: IArray, string: number, offset: number, count: number,
	                        callback: (a: IArray, b: IArray) => void): IArray;

	/**
	 * Returns a string representation of a vector
	 *
	 * @param vec vector to represent as a string
	 * @returns string representation of the vector
	 */
	str(a: IArray): string;
}

// mat2
export interface mat2 {

	/**
	 * Creates a new identity mat2
	 *
	 * @returns a new 2x2 matrix
	 */
	create(): IArray;

	/**
	 * Creates a new mat2 initialized with values from an existing matrix
	 *
	 * @param a matrix to clone
	 * @returns a new 2x2 matrix
	 */
	clone(a: IArray): IArray;

	/**
	 * Copy the values from one mat2 to another
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	copy(out: IArray, a: IArray): IArray;

	/**
	 * Set a mat2 to the identity matrix
	 *
	 * @param out the receiving matrix
	 * @returns out
	 */
	identity(out: IArray): IArray;

	/**
	 * Transpose the values of a mat2
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	transpose(out: IArray, a: IArray): IArray;

	/**
	 * Inverts a mat2
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	invert(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the adjugate of a mat2
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	adjoint(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the determinant of a mat2
	 *
	 * @param a the source matrix
	 * @returns determinant of a
	 */
	determinant(a: IArray): number;

	/**
	 * Multiplies two mat2's
	 *
	 * @param out the receiving matrix
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	multiply(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Multiplies two mat2's
	 *
	 * @param out the receiving matrix
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	mul(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Rotates a mat2 by the given angle
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to rotate
	 * @param rad the angle to rotate the matrix by
	 * @returns out
	 */
	rotate(out: IArray, a: IArray, rad: number): IArray;

	/**
	 * Scales the mat2 by the dimensions in the given vec2
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to rotate
	 * @param v the vec2 to scale the matrix by
	 * @returns out
	 **/
	scale(out: IArray, a: IArray, v: IArray): IArray;

	/**
	 * Returns a string representation of a mat2
	 *
	 * @param a matrix to represent as a string
	 * @returns string representation of the matrix
	 */
	str(a: IArray): string;

	/**
	 * Returns Frobenius norm of a mat2
	 *
	 * @param a the matrix to calculate Frobenius norm of
	 * @returns Frobenius norm
	 */
	frob(a: IArray): number;

	/**
	 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
	 * @param L the lower triangular matrix
	 * @param D the diagonal matrix
	 * @param U the upper triangular matrix
	 * @param a the input matrix to factorize
	 */
	LDU(L: IArray, D: IArray, U: IArray, a: IArray): IArray;
}

// mat2d
export interface mat2d {

	/**
	 * Creates a new identity mat2d
	 *
	 * @returns a new 2x3 matrix
	 */
	create(): IArray;

	/**
	 * Creates a new mat2d initialized with values from an existing matrix
	 *
	 * @param a matrix to clone
	 * @returns a new 2x3 matrix
	 */
	clone(a: IArray): IArray;

	/**
	 * Copy the values from one mat2d to another
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	copy(out: IArray, a: IArray): IArray;

	/**
	 * Set a mat2d to the identity matrix
	 *
	 * @param out the receiving matrix
	 * @returns out
	 */
	identity(out: IArray): IArray;

	/**
	 * Inverts a mat2d
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	invert(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the determinant of a mat2d
	 *
	 * @param a the source matrix
	 * @returns determinant of a
	 */
	determinant(a: IArray): number;

	/**
	 * Multiplies two mat2d's
	 *
	 * @param out the receiving matrix
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	multiply(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Multiplies two mat2d's
	 *
	 * @param out the receiving matrix
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	mul(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Rotates a mat2d by the given angle
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to rotate
	 * @param rad the angle to rotate the matrix by
	 * @returns out
	 */
	rotate(out: IArray, a: IArray, rad: number): IArray;

	/**
	 * Scales the mat2d by the dimensions in the given vec2
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to translate
	 * @param v the vec2 to scale the matrix by
	 * @returns out
	 **/
	scale(out: IArray, a: IArray, v: IArray): IArray;

	/**
	 * Translates the mat2d by the dimensions in the given vec2
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to translate
	 * @param v the vec2 to translate the matrix by
	 * @returns out
	 **/
	translate(out: IArray, a: IArray, v: IArray): IArray;

	/**
	 * Returns a string representation of a mat2d
	 *
	 * @param a matrix to represent as a string
	 * @returns string representation of the matrix
	 */
	str(a: IArray): string;

	/**
	 * Returns Frobenius norm of a mat2d
	 *
	 * @param a the matrix to calculate Frobenius norm of
	 * @returns Frobenius norm
	 */
	frob(a: IArray): number;
}

// mat3
export interface mat3 {

	/**
	 * Creates a new identity mat3
	 *
	 * @returns a new 3x3 matrix
	 */
	create(): IArray;

	/**
	 * Creates a new mat3 initialized with values from an existing matrix
	 *
	 * @param a matrix to clone
	 * @returns a new 3x3 matrix
	 */
	clone(a: IArray): IArray;

	/**
	 * Copy the values from one mat3 to another
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	copy(out: IArray, a: IArray): IArray;

	/**
	 * Set a mat3 to the identity matrix
	 *
	 * @param out the receiving matrix
	 * @returns out
	 */
	identity(out: IArray): IArray;

	/**
	 * Transpose the values of a mat3
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	transpose(out: IArray, a: IArray): IArray;

	/**
	 * Inverts a mat3
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	invert(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the adjugate of a mat3
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	adjoint(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the determinant of a mat3
	 *
	 * @param a the source matrix
	 * @returns determinant of a
	 */
	determinant(a: IArray): number;

	/**
	 * Multiplies two mat3's
	 *
	 * @param out the receiving matrix
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	multiply(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Multiplies two mat3's
	 *
	 * @param out the receiving matrix
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	mul(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Returns a string representation of a mat3
	 *
	 * @param mat matrix to represent as a string
	 * @returns string representation of the matrix
	 */
	str(mat: IArray): string;

	/**
	 * Returns Frobenius norm of a mat3
	 *
	 * @param a the matrix to calculate Frobenius norm of
	 * @returns Frobenius norm
	 */
	frob(a: IArray): number;

	/**
	 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
	 *
	 * @param out mat3 receiving operation result
	 * @param a Mat4 to derive the normal matrix from
	 *
	 * @returns out
	 */
	normalFromMat4(out: IArray, a: IArray): IArray;

	/**
	 * Calculates a 3x3 matrix from the given quaternion
	 *
	 * @param out mat3 receiving operation result
	 * @param q Quaternion to create matrix from
	 *
	 * @returns out
	 */
	fromQuat(out: IArray, q: IArray): IArray;

	/**
	 * Copies the upper-left 3x3 values into the given mat3.
	 *
	 * @param out the receiving 3x3 matrix
	 * @param a   the source 4x4 matrix
	 * @returns out
	 */
	fromMat4(out: IArray, a: IArray): IArray;

	/**
	 * Scales the mat3 by the dimensions in the given vec2
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to rotate
	 * @param v the vec2 to scale the matrix by
	 * @returns out
	 **/
	scale(out: IArray, a: IArray, v: IArray): IArray;

	/**
	 * Copies the values from a mat2d into a mat3
	 *
	 * @param out the receiving matrix
	 * @param {mat2d} a the matrix to copy
	 * @returns out
	 **/
	fromMat2d(out: IArray, a: IArray): IArray;

	/**
	 * Translate a mat3 by the given vector
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to translate
	 * @param v vector to translate by
	 * @returns out
	 */
	translate(out: IArray, a: IArray, v: IArray): IArray;

	/**
	 * Rotates a mat3 by the given angle
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to rotate
	 * @param rad the angle to rotate the matrix by
	 * @returns out
	 */
	rotate(out: IArray, a: IArray, rad: number): IArray;
}

// mat4
export interface mat4 {

	/**
	 * Creates a new identity mat4
	 *
	 * @returns a new 4x4 matrix
	 */
	create(): IArray;

	/**
	 * Creates a new mat4 initialized with values from an existing matrix
	 *
	 * @param a matrix to clone
	 * @returns a new 4x4 matrix
	 */
	clone(a: IArray): IArray;

	/**
	 * Copy the values from one mat4 to another
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	copy(out: IArray, a: IArray): IArray;

	/**
	 * Set a mat4 to the identity matrix
	 *
	 * @param out the receiving matrix
	 * @returns out
	 */
	identity(a: IArray): IArray;

	/**
	 * Transpose the values of a mat4
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	transpose(out: IArray, a: IArray): IArray;

	/**
	 * Inverts a mat4
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	invert(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the adjugate of a mat4
	 *
	 * @param out the receiving matrix
	 * @param a the source matrix
	 * @returns out
	 */
	adjoint(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the determinant of a mat4
	 *
	 * @param a the source matrix
	 * @returns determinant of a
	 */
	determinant(a: IArray): number;

	/**
	 * Multiplies two mat4's
	 *
	 * @param out the receiving matrix
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	multiply(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Multiplies two mat4's
	 *
	 * @param out the receiving matrix
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	mul(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Translate a mat4 by the given vector
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to translate
	 * @param v vector to translate by
	 * @returns out
	 */
	translate(out: IArray, a: IArray, v: IArray): IArray;

	/**
	 * Scales the mat4 by the dimensions in the given vec3
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to scale
	 * @param v the vec3 to scale the matrix by
	 * @returns out
	 **/
	scale(out: IArray, a: IArray, v: IArray): IArray;

	/**
	 * Rotates a mat4 by the given angle
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to rotate
	 * @param rad the angle to rotate the matrix by
	 * @param axis the axis to rotate around
	 * @returns out
	 */
	rotate(out: IArray, a: IArray, rad: number, axis: IArray): IArray;

	/**
	 * Rotates a matrix by the given angle around the X axis
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to rotate
	 * @param rad the angle to rotate the matrix by
	 * @returns out
	 */
	rotateX(out: IArray, a: IArray, rad: number): IArray;

	/**
	 * Rotates a matrix by the given angle around the Y axis
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to rotate
	 * @param rad the angle to rotate the matrix by
	 * @returns out
	 */
	rotateY(out: IArray, a: IArray, rad: number): IArray;

	/**
	 * Rotates a matrix by the given angle around the Z axis
	 *
	 * @param out the receiving matrix
	 * @param a the matrix to rotate
	 * @param rad the angle to rotate the matrix by
	 * @returns out
	 */
	rotateZ(out: IArray, a: IArray, rad: number): IArray;

	/**
	 * Generates a frustum matrix with the given bounds
	 *
	 * @param out mat4 frustum matrix will be written into
	 * @param left Left bound of the frustum
	 * @param right Right bound of the frustum
	 * @param bottom Bottom bound of the frustum
	 * @param top Top bound of the frustum
	 * @param near Near bound of the frustum
	 * @param far Far bound of the frustum
	 * @returns out
	 */
	frustum(out: IArray, left: number, right: number,
	                        bottom: number, top: number, near: number, far: number): IArray;

	/**
	 * Generates a perspective projection matrix with the given bounds
	 *
	 * @param out mat4 frustum matrix will be written into
	 * @param fovy Vertical field of view in radians
	 * @param aspect Aspect ratio. typically viewport width/height
	 * @param near Near bound of the frustum
	 * @param far Far bound of the frustum
	 * @returns out
	 */
	perspective(out: IArray, fovy: number, aspect: number,
	                            near: number, far: number): IArray;

	/**
	 * Generates a orthogonal projection matrix with the given bounds
	 *
	 * @param out mat4 frustum matrix will be written into
	 * @param left Left bound of the frustum
	 * @param right Right bound of the frustum
	 * @param bottom Bottom bound of the frustum
	 * @param top Top bound of the frustum
	 * @param near Near bound of the frustum
	 * @param far Far bound of the frustum
	 * @returns out
	 */
	ortho(out: IArray, left: number, right: number,
	                      bottom: number, top: number, near: number, far: number): IArray;

	/**
	 * Generates a look-at matrix with the given eye position, focal point, and up axis
	 *
	 * @param out mat4 frustum matrix will be written into
	 * @param eye Position of the viewer
	 * @param center Point the viewer is looking at
	 * @param up vec3 pointing up
	 * @returns out
	 */
	lookAt(out: IArray, eye: IArray,
	                       center: IArray, up: IArray): IArray;

	/**
	 * Returns a string representation of a mat4
	 *
	 * @param mat matrix to represent as a string
	 * @returns string representation of the matrix
	 */
	str(mat: IArray): string;

	/**
	 * Returns Frobenius norm of a mat4
	 *
	 * @param a the matrix to calculate Frobenius norm of
	 * @returns Frobenius norm
	 */
	frob(a: IArray): number;

	/**
	 * Creates a matrix from a quaternion rotation and vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *
	 * @param out mat4 receiving operation result
	 * @param q Rotation quaternion
	 * @param v Translation vector
	 * @returns out
	 */
	fromRotationTranslation(out: IArray, q: IArray,
	                                        v: IArray): IArray;

	/**
	 * Creates a matrix from a quaternion
	 *
	 * @param out mat4 receiving operation result
	 * @param q Rotation quaternion
	 * @returns out
	 */
	fromQuat(out: IArray, q: IArray): IArray;
}

// quat
export interface quat {

	/**
	 * Creates a new identity quat
	 *
	 * @returns a new quaternion
	 */
	create(): IArray;

	/**
	 * Creates a new quat initialized with values from an existing quaternion
	 *
	 * @param a quaternion to clone
	 * @returns a new quaternion
	 * @function
	 */
	clone(a: IArray): IArray;

	/**
	 * Creates a new quat initialized with the given values
	 *
	 * @param x X component
	 * @param y Y component
	 * @param z Z component
	 * @param w W component
	 * @returns a new quaternion
	 * @function
	 */
	fromValues(x: number, y: number, z: number, w: number): IArray;

	/**
	 * Copy the values from one quat to another
	 *
	 * @param out the receiving quaternion
	 * @param a the source quaternion
	 * @returns out
	 * @function
	 */
	copy(out: IArray, a: IArray): IArray;

	/**
	 * Set the components of a quat to the given values
	 *
	 * @param out the receiving quaternion
	 * @param x X component
	 * @param y Y component
	 * @param z Z component
	 * @param w W component
	 * @returns out
	 * @function
	 */
	set(out: IArray, x: number, y: number, z: number, w: number): IArray;

	/**
	 * Set a quat to the identity quaternion
	 *
	 * @param out the receiving quaternion
	 * @returns out
	 */
	identity(out: IArray): IArray;

	/**
	 * Sets a quat from the given angle and rotation axis,
	 * then returns it.
	 *
	 * @param out the receiving quaternion
	 * @param axis the axis around which to rotate
	 * @param rad the angle in radians
	 * @returns out
	 **/
	setAxisAngle(out: IArray, axis: IArray, rad: number): IArray;

	/**
	 * Adds two quat's
	 *
	 * @param out the receiving quaternion
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 * @function
	 */
	add(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Multiplies two quat's
	 *
	 * @param out the receiving quaternion
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	multiply(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Multiplies two quat's
	 *
	 * @param out the receiving quaternion
	 * @param a the first operand
	 * @param b the second operand
	 * @returns out
	 */
	mul(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Scales a quat by a scalar number
	 *
	 * @param out the receiving vector
	 * @param a the vector to scale
	 * @param b amount to scale the vector by
	 * @returns out
	 * @function
	 */
	scale(out: IArray, a: IArray, b: number): IArray;

	/**
	 * Calculates the length of a quat
	 *
	 * @param a vector to calculate length of
	 * @returns length of a
	 * @function
	 */
	length(a: IArray): number;

	/**
	 * Calculates the length of a quat
	 *
	 * @param a vector to calculate length of
	 * @returns length of a
	 * @function
	 */
	len(a: IArray): number;

	/**
	 * Calculates the squared length of a quat
	 *
	 * @param a vector to calculate squared length of
	 * @returns squared length of a
	 * @function
	 */
	squaredLength(a: IArray): number;

	/**
	 * Calculates the squared length of a quat
	 *
	 * @param a vector to calculate squared length of
	 * @returns squared length of a
	 * @function
	 */
	sqrLen(a: IArray): number;

	/**
	 * Normalize a quat
	 *
	 * @param out the receiving quaternion
	 * @param a quaternion to normalize
	 * @returns out
	 * @function
	 */
	normalize(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the dot product of two quat's
	 *
	 * @param a the first operand
	 * @param b the second operand
	 * @returns dot product of a and b
	 * @function
	 */
	dot(out: IArray, a: IArray, b: IArray): number;

	/**
	 * Performs a linear interpolation between two quat's
	 *
	 * @param out the receiving quaternion
	 * @param a the first operand
	 * @param b the second operand
	 * @param t interpolation amount between the two inputs
	 * @returns out
	 * @function
	 */
	lerp(out: IArray, a: IArray, b: IArray, t: number): IArray;

	/**
	 * Performs a spherical linear interpolation between two quat
	 *
	 * @param out the receiving quaternion
	 * @param a the first operand
	 * @param b the second operand
	 * @param t interpolation amount between the two inputs
	 * @returns out
	 */
	slerp(out: IArray, a: IArray, b: IArray, t: number): IArray;

	/**
	 * Calculates the inverse of a quat
	 *
	 * @param out the receiving quaternion
	 * @param a quat to calculate inverse of
	 * @returns out
	 */
	invert(out: IArray, a: IArray): IArray;

	/**
	 * Calculates the conjugate of a quat
	 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
	 *
	 * @param out the receiving quaternion
	 * @param a quat to calculate conjugate of
	 * @returns out
	 */
	conjugate(out: IArray, a: IArray): IArray;

	/**
	 * Returns a string representation of a quatenion
	 *
	 * @param vec vector to represent as a string
	 * @returns string representation of the vector
	 */
	str(a: IArray): string;

	/**
	 * Rotates a quaternion by the given angle about the X axis
	 *
	 * @param out quat receiving operation result
	 * @param a quat to rotate
	 * @param rad angle (in radians) to rotate
	 * @returns out
	 */
	rotateX(out: IArray, a: IArray, rad: number): IArray;

	/**
	 * Rotates a quaternion by the given angle about the Y axis
	 *
	 * @param out quat receiving operation result
	 * @param a quat to rotate
	 * @param rad angle (in radians) to rotate
	 * @returns out
	 */
	rotateY(out: IArray, a: IArray, rad: number): IArray;

	/**
	 * Rotates a quaternion by the given angle about the Z axis
	 *
	 * @param out quat receiving operation result
	 * @param a quat to rotate
	 * @param rad angle (in radians) to rotate
	 * @returns out
	 */
	rotateZ(out: IArray, a: IArray, rad: number): IArray;

	/**
	 * Creates a quaternion from the given 3x3 rotation matrix.
	 *
	 * NOTE: The resultant quaternion is not normalized, so you should be sure
	 * to renormalize the quaternion yourself where necessary.
	 *
	 * @param out the receiving quaternion
	 * @param m rotation matrix
	 * @returns out
	 * @function
	 */
	fromMat3(out: IArray, m: IArray): IArray;

	/**
	 * Sets the specified quaternion with values corresponding to the given
	 * axes. Each axis is a vec3 and is expected to be unit length and
	 * perpendicular to all other specified axes.
	 *
	 * @param view  the vector representing the viewing direction
	 * @param right the vector representing the local "right" direction
	 * @param up    the vector representing the local "up" direction
	 * @returns out
	 */
	setAxes(out: IArray, view: IArray, right: IArray,
	                        up: IArray): IArray;

	/**
	 * Sets a quaternion to represent the shortest rotation from one
	 * vector to another.
	 *
	 * Both vectors are assumed to be unit length.
	 *
	 * @param out the receiving quaternion.
	 * @param a the initial vector
	 * @param b the destination vector
	 * @returns out
	 */
	rotationTo(out: IArray, a: IArray, b: IArray): IArray;

	/**
	 * Calculates the W component of a quat from the X, Y, and Z components.
	 * Assumes that quaternion is 1 unit in length.
	 * Any existing W component will be ignored.
	 *
	 * @param out the receiving quaternion
	 * @param a quat to calculate W component of
	 * @returns out
	 */
	calculateW(out: IArray, a: IArray): IArray;
}