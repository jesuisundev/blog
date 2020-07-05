#include <iostream> 
#include <queue> 
  
using namespace std; 
  
int main() 
{ 
    queue <int> myQueue;

    // push operation
    myQueue.push(1998);
    myQueue.push(2006);
    myQueue.push(2018);
    
    // pop operation
    myQueue.pop();

    // top operation
    cout << "\nfront of the queue is " << myQueue.front();

    // isEmpty operation
    cout << "\nqueue is empty ? " << myQueue.empty() << "\n";

    return 0; 
} 