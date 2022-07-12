import Stack from "./Stack";

class Tower {
  constructor() {
    this.disks = new Stack(7);
    this.function = () => {};
  }
  moveDisks(n, origin, destination, aux) {
    if (n === 0) {
      return;
    }
    this.moveDisks(n - 1, origin, aux, destination);
    origin.moveTopTo(destination);
    this.moveDisks(n - 1, aux, destination, origin);
  }

  add(value) {
    if (this.disks.isEmpty() || value < this.disks.top.value) {
      this.disks.push(value);
    }
  }

  moveTopTo(desTower) {
    if (this.disks !== null) {
      let valueHead = this.disks.peek();
      if (desTower.disks.isEmpty() || desTower.disks.top.value > valueHead) {
        let disk = this.disks.pop();
        desTower.add(disk.value);
        return true;
      }
      return false;
    }
  }
}

export default Tower;
