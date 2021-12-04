
export const depthMeasurement = (input) => {
 return input.map((v, i) => {
    return v < input[i+1] ? 1 : 0
  }).filter((i) => i === 1).length
}

export const slidingDepthMeasurement = (input) => {
  return input.map((v, i) => {
    if (!input[i+1] && !input[i+2]) return 0
    return (v + input[i+1] + input[i+2]) < (input[i+1] + input[i+2] + input[i+3]) ? 1 : 0
  }).filter((i) => i === 1).length
}