#include <iostream>

using namespace std;

struct Node
{
    string value;
    struct Node* left;
    struct Node* right;
};

int main() 
{
    Node CEO;
    CEO.value = "CEO";

    Node CIO;
    CIO.value = "CIO";

    Node CMO;
    CMO.value = "CMO";

    Node VP;
    VP.value = "VP";

    CEO.left = &CIO;
    CEO.right = &CMO;
    CMO.left = &VP;

    //     "CEO"   
    //     /   \   
    //  "CIO" "CMO"
    //        /
    //      "VP"

    return 0;
}