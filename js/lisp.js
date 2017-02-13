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

    (define (func produce iter counter)
        (cond ((iter > counter) produce)
              (else (if (< iter 3)
                        (func (iter (+ iter 1) counter))
                        (func ((+ (- produce 1) (* 2 (- produce 2)) (* 3 (- produce 3))) (+ iter 1) counter))
                    )
              )
        )            
    )



    (func 1 1 3)
/*------------1.11------------*/










