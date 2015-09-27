function tMatrix(M) {
    var c = M[0].length;
    var R = [];
    for (var i = 0; i < c; i++) {
        var t = [];
        for (var j = 0; j < M.length; j++) {
            t.push(M[j][i]);
        }
        R.push(t);
    }
    return R;
}

function mulMatrix(M, N) {
    if (M[0].length !== N.length) {
        return;
    }
    var c = N[0].length;
    var R = [];
    for (var i = 0; i < M.length; i++) {
        var t = [];
        for (var j = 0; j < c; j++) {
            var v = 0;
            for (var k = 0; k < N.length; k++) {
                v += M[i][k] * N[k][j];
            }
            t.push(v);
        }
        R.push(t);
    }
    return R;
}

function iMatrix(M) {
    //if the matrix isn't square: exit (error)
    if (M.length !== M[0].length) {
        return;
    }

    //create the identity matrix (I), and a copy (C) of the original
    var i = 0,
        ii = 0,
        j = 0,
        dim = M.length,
        e = 0,
        t = 0;
    var I = [],
        C = [];
    for (i = 0; i < dim; i += 1) {
        // Create the row
        I[I.length] = [];
        C[C.length] = [];
        for (j = 0; j < dim; j += 1) {

            //if we're on the diagonal, put a 1 (for identity)
            if (i == j) {
                I[i][j] = 1;
            } else {
                I[i][j] = 0;
            }

            // Also, make the copy of the original
            C[i][j] = M[i][j];
        }
    }

    // Perform elementary row operations
    for (i = 0; i < dim; i += 1) {
        // get the element e on the diagonal
        e = C[i][i];

        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        if (e == 0) {
            //look through every row below the i'th row
            for (ii = i + 1; ii < dim; ii += 1) {
                //if the ii'th row has a non-0 in the i'th col
                if (C[ii][i] != 0) {
                    //it would make the diagonal have a non-0 so swap it
                    for (j = 0; j < dim; j++) {
                        e = C[i][j]; //temp store i'th row
                        C[i][j] = C[ii][j]; //replace i'th row by ii'th
                        C[ii][j] = e; //repace ii'th by temp
                        e = I[i][j]; //temp store i'th row
                        I[i][j] = I[ii][j]; //replace i'th row by ii'th
                        I[ii][j] = e; //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            //get the new diagonal
            e = C[i][i];
            //if it's still 0, not invertable (error)
            if (e == 0) {
                return
            }
        }

        // Scale this row down by e (so we have a 1 on the diagonal)
        for (j = 0; j < dim; j++) {
            C[i][j] = C[i][j] / e; //apply to original matrix
            I[i][j] = I[i][j] / e; //apply to identity
        }

        // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        // rows above and below this one
        for (ii = 0; ii < dim; ii++) {
            // Only apply to other rows (we want a 1 on the diagonal)
            if (ii == i) {
                continue;
            }

            // We want to change this element to 0
            e = C[ii][i];

            // Subtract (the row above(or below) scaled by e) from (the
            // current row) but start at the i'th column and assume all the
            // stuff left of diagonal is 0 (which it should be if we made this
            // algorithm correctly)
            for (j = 0; j < dim; j++) {
                C[ii][j] -= e * C[i][j]; //apply to original matrix
                I[ii][j] -= e * I[i][j]; //apply to identity
            }
        }
    }
    //we've done all operations, C should be the identity
    //matrix I should be the inverse:
    return I;
}

function linearRegression(M,rd) {
	//M: matrix
	//rd: number of decimal digits
	var X = [], Y = [];
	var c = M[0].length;
	//find X,Y
	for (var i=0; i<M.length; i++) {
		var t = [1];
		for (var j=0; j<c-1; j++) {
			t.push(M[i][j]);
		}
		X.push(t);
		Y.push([M[i][c-1]]);
	}
	//
	try {
		var T1 = mulMatrix(tMatrix(X),X);
		var T2 = iMatrix(T1);
		var T3 = mulMatrix(tMatrix(X),Y);
		var T4 = mulMatrix(T2,T3);
		rd = rd||3;
		var rm = Math.pow(10,rd);
		return tMatrix(T4)[0].map(function(val) {
			return Math.round(val*rm)/rm;
		})
	} catch (e) {
		return null;
	}
}
