#include <iostream>
#include <stack>

using namespace std;

int main () 
{
    stack <int> myStack;

    // push operation
    myStack.push(1998); 
    myStack.push(2006); 
    myStack.push(2018); 

    // top operation
    cout << "\ntop of the stack is " << myStack.top(); 

    // pop operation
    myStack.pop(); 

    // isEmpty operation
    cout << "\nstack is empty ? " << myStack.empty() << "\n";

    return 0; 
}