import Stack from './Stack';

class Tower {
  constructor() {
    this.disks = new Stack(7);
    this.render = false;
  }

  add(value) {
    if (this.disks.size === 0 || value < this.disks.top.value) {
      this.disks.push(value);
    }
  }

  moveTopTo(desTower) {
    if (this.disks.top !== null) {
      let disk = this.disks.pop();
      desTower.add(disk.value);
    }
  }

  moveDisks(n, from, to, via) {
    if (n === 0) {
      return;
    }

    this.moveDisks(n - 1, from, via, to);

    this.moveTopTo(from, to);

    this.moveDisks(n - 1, via, to, from);
  }
}

export default Tower;
