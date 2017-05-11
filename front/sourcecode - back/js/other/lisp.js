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

/*------------1.2.2树形递归动态规划------------*/
    (define (count-change amount)
        (cc amount 5))

    (define (cc amount kinds-of-coins)
        (cond ((= amount 0) 1)
            ((or (< amount 0) (= kinds-of-coins 0)) 0)
            (else (+ (cc amount
                            (- kinds-of-coins 1))
                     (cc (- amount
                            (first-denomination kinds-of-coins))
                     kinds-of-coins)))))

    (define (first-denomination kinds-of-coins)
        (cond ((= kinds-of-coins 1) 1)
              ((= kinds-of-coins 2) 5)
              ((= kinds-of-coins 3) 10)
              ((= kinds-of-coins 4) 25)
              ((= kinds-of-coins 5) 50)))
/*------------1.2.2树形递归动态规划------------*/

/*------------线性递归------------*/
    (define (factorial n)
        (if (= n 1)
            1
            (* n (factorial (- n 1)))))


    (define (factorial n)
        (fact-iter 1 1 n))

    (define (fact-iter product counter max-count)
        (if (> counter max-count)
            product
            (fact-iter (* counter product)
                       (+ counter 1)
                       max-count)))
/*------------线性递归------------*/

/*------------树形递归------------*/
    (define (fib n)
        (cond ((= n 0) 0)
              ((= n 1) 1)
              (else (+ (fib (- n 1)) (fib (- n 2))))
        )
    )

    (define (fib n)
        (fib-iter 1 0 n))

    (define (fib-iter a b count)
        (if (= count 0)
            b
            (fib-iter (+ a b) a (- count 1))))
/*------------树形递归------------*/


/*------------1.11------------*/
    (define (func n)
        (if (< n 3)
            n
            (+ (func (- n 1)) (* 2 (func (- n 2))) (* 3 (func (- n 3))))
        )
    )

    (define (func r1 r2 r3 iter n)
        (
            if (= iter n) 
                r3
                (func (+ r1 (* 2 r2) (* 3 r3)) r1 r2 (+ iter 1) n)
        )
    )



    (func 1 1 3)
/*------------1.11------------*/

/*------------1.12------------*/
    (define (pascal row col)
        (cond ((> col row) (error "unvalid col value"))
              ((or (= col 0) (= row col)) 1)
              (else (+ (pascal (- row 1) (- col 1)) (pascal (- row 1) col)))
        )
    )
/*------------1.12------------*/

/*------------1.15------------*/
    (define (cubic num)( *
            num  num  num
        )
    )

    (define (pTest x)
        (- (* 3.0 x) (* 4.0 (cubic x)))
    )

    (define (sin x)(
        if (not (> (abs x) 0.1)) x
            (pTest (sin (/ x 3.0)))
    ))

    (define (cube x) (* x x x))
    (define (p x)(- (* 3 x) (* 4 (cube x))))
    (define (sine angle)(
        if (not (> (abs angle) 0.1)) angle
            (p (sine (/ angle 3.0)))
        ))
/*------------1.15------------*/

/*------------exponentiation ------------*/
    (define (expt b n)
        (cond ((= n 0) 1)
              (else (* b (expt b (- n 1))))
        )
    )

    (define (expt result count b)
        (
            if (= count 0) result
                (expt (* result b) (- count 1) b)
        )
    )

    (define (event? n)
        (= (remainder n 2) 0)
    )

/*------------exponentiation ------------*/

