/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-08 09:39:06
 * @version $Id$
 */

/*------------sqrt------------*/
    (define (square x) (* x x))

    (define (sqrt-iter guess x)
        (if (good-enough? guess (improve guess x))
            (improve guess x)
            (sqrt-iter (improve guess x) x)
        )
    )

    (define (sqrt-iter guess x)
        (if (good-enough? guess x)
            guess
            (sqrt-iter (improve guess x) x)
        )
    )


    (define (sqrt-iter guess x)
        (new-if (good-enough? guess x)
            guess
            (sqrt-iter (improve guess x) x) 
        )
    )

    (define (improve guess x)
        (average guess (/ x guess))
    )

    (define (average x y)
        (/ (+ x y) 2)
    )

    (define (good-enough? guess x)
        (< (abs (- (square guess) x)) 0.0001)
    )

    (define (sqrt x)
        (sqrt-iter 1.0 x)
    )

    (define (new-if predicate then-clause else-clause)
        (cond (predicate then-clause)
            (else else-clause)
        )
    )

    (if #t (display "good")(display "bad"))

    (new-if #t (display "good")(display "bad"))


    (define (good-enough? old-guess new-guess)
        (< (/ (abs (- new-guess old-guess)) old-guess) 0.01)
    )
/*------------sqrt------------*/


// (define (sqrt-iter guess x)
//     (if (good-enough? guess (improve guess x))
//         (improve guess x)
//         (sqrt-iter (improve guess x) x)
//     )
// )
/*------------substrip------------*/

    (define (improve guess x)
        (/ (+ (/ x (square guess)) (* 2 guess)) 3)
    )

/*------------substrip------------*/






