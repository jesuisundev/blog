const wasmBinaryBuffer = await fetch("https://bit.ly/3bhSp8O").then(response => response.arrayBuffer())
const wasmModule = await WebAssembly.instantiate(wasmBinaryBuffer)
const addFunctionExported = wasmModule.instance.exports._Z3addii
console.log(`Result of the WebAssembly module call : ${addFunctionExported(2, 2)}`)