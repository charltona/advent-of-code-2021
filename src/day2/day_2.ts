export type Command = {command: string, value: number}

const CommandNames = Object.freeze({
  forward: 'forward',
  up: 'up',
  down: 'down',
})

export const positionCalculator = (input: Command[]) => {
  const coords = {
    x: 0,
    y: 0
  }

  const commandSet = {
    [CommandNames.forward]: (value) => {
      coords.x = coords.x + value
    },
    [CommandNames.up]:  (value) => {
      coords.y = coords.y - value;
    },
    [CommandNames.down]: (value) => {
      coords.y = coords.y + value;
    }
  }

  input.forEach((cmd) => {
    commandSet[cmd.command](cmd.value)
  })

  return coords.x * coords.y;
}

export const improvedPositionCalculator = (input) => {
  const coords = {
    x: 0,
    y: 0,
    z: 0,
  }

  const commandSet = {
    [CommandNames.forward]: (value) => {
      coords.x = coords.x + value;
      coords.y = coords.y + (coords.z * value);
    },
    [CommandNames.up]:  (value) => {
      coords.z = coords.z - value;
    },
    [CommandNames.down]: (value) => {
      coords.z = coords.z + value;
    }
  }

  input.forEach((cmd) => {
    commandSet[cmd.command](cmd.value)
  })

  return coords.x * coords.y
}