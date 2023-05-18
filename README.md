# Calculator
Calculator - Internship - from 10th to 12th of february - "Maison Random Internship"

A calculator made with React. (JS, CSS, HTML)

🧊 Features: 

💧 Addition

💧 Subtraction

💧 Division

💧 Multiplication

💧 Clear

💧 Calculate percentage

💧 Change sign +/- n

🧊 Structure:

For this I used a nested HTML structure, designed in a seperate CSS file. The picture below visualizes it.

![Calculator Structure Complete](https://user-images.githubusercontent.com/91912841/153583025-7a177dfa-0c23-477f-b520-2ce775ea9cf6.jpg)

🧊 Instructions explained:

Going from top to bottom in the code-------------------------------------------------------------------------

--------------------------------------------------------------------------------------------------------------

Container  - Frame, holding all the children. (ButtonBox (Button), Screen)

Screen - Child of the Container. It will display the result.

ButtonBox - Child of Container. Contains the "Button" child.

Button - Provides the interface for the user to operate on the calculator. (Child of the Buttonbox)

--------------------------------------------------------------------------------------------------------------

btnValues - An array representation of the buttons.

toLocaleString, removeSpaces - For value formatting by using a regex.

App - Declare the state variables using the 'useState' hook in react.

sign - +,-,/,*

num 0 - 9

res: result 

--------------------------------------------------------------------------------------------------------------

numClickHandler - If a button is pressed it adds the value to 'num'.

comaClickHandler - Let's you work with floating point numbers by adding a decimal point.

signClickHandler - Press an operator button (+,-,/,*). It sets the value to 'sign'.

equalsClickHandler - It calculates the result when the equals '=' button is pressed. Sets the result to 'res'.

invertClickHandler - Changes the prefix (+,-) of the number by multiplying with  - 1.

percentClickHandler - Let's you calculate the percentage. 

resetClickHandler - Clears everything by resetting the values.

--------------------------------------------------------------------------------------------------------------
