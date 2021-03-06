import React, { useEffect, useState } from "react";
import GameOptionsComp from "./components/GameOptionsComp";
import TowerComp from "./components/TowerComp";
import WinMessageComp from "./components/WinMessageComp";
import Tower from "./utils/Tower";
import deepCopy from "./helpers/deepCopy";
import "./App.css";

const App = () => {
  //Contar el numero de movimientos
  const [moveCount, setMoveCount] = useState(0);
  //El disco que se está movimiendo
  const [dragTile, setDragTile] = useState();
  //Los discos para la torre principal
  const [disks, setDisks] = useState(3);
  const [size, setSize] = useState(disks);

  //Los discos de cada torre (1, 2, 3)
  const [tiles, setTiles] = useState([]);
  const [tilesTwo, setTilesTwo] = useState([]);
  const [tilesThree, setTilesThree] = useState([]);

  //Las 3 torres (columnas)
  let [towerOne, setTowerOne] = useState(new Tower());
  let [towerTwo, setTowerTwo] = useState(new Tower());
  let [towerThree, setTowerThree] = useState(new Tower());

  const towers = {
    1: {
      tower: towerOne,
    },
    2: {
      tower: towerTwo,
    },
    3: {
      tower: towerThree,
    },
  };

  useEffect(() => {
    //Resetear las torres
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disks]);

  //Actualizar todos los discos de las torres
  //Esta actualización se hará con cada movimiento de las torres
  useEffect(() => {
    setTiles(towerOne.disks.traverse());
  }, [towerOne]);

  useEffect(() => {
    setTilesTwo(towerTwo.disks.traverse());
  }, [towerTwo]);

  useEffect(() => {
    setTilesThree(towerThree.disks.traverse());
  }, [towerThree]);

  const reset = () => {
    towerOne = new Tower();
    if (towerOne.disks.size === 0) {
      for (let i = disks; i > 0; i--) {
        towerOne.add(i);
        setTowerOne(deepCopy(towerOne));
      }
    }
    setSize(disks);
    setMoveCount(0);
    setTowerTwo(new Tower());
    setTowerThree(new Tower());
  };

  const handleDrag = (e, tile, id) => {
    //Funcion que se lanza cada vez que movemos un disco que se encuentra en la parte superior de una torre
    const dragTile = { tile, towerId: id };

    if (towers[id].tower.disks.top.id === dragTile.tile.id) {
      setDragTile(dragTile);
    } else {
      e.preventDefault();
    }
  };

  const handleDrop = (e) => {
    //Funcion que se lanza cada vez que un disco se deja en una nueva torre
    const dropColumn = e.currentTarget.id; //ID de la columna de destino
    let source = towers[dragTile.towerId].tower; //Torre de origen
    let destination = towers[dropColumn].tower; //Torre de destino

    const goodMove = source.moveTopTo(destination); //Mover el disco desde la torre de origen al destino
    if (goodMove) {
      //Si es un movimiento valido -> incrementar los movimientos
      setMoveCount((prevState) => prevState + 1); //Actualizar los movimientos

      setTowerOne(deepCopy(towerOne));

      setTowerTwo(deepCopy(towerTwo));

      setTowerThree(deepCopy(towerThree));
    }
  };

  const solve = () => {
    towerOne.moveDisks(disks, towerOne, towerThree, towerTwo, 0);

    setTowerOne(deepCopy(towerOne));

    setTowerTwo(deepCopy(towerTwo));

    setTowerThree(deepCopy(towerThree));
  };

  const winCondition =
    size === towerTwo.disks.size || size === towerThree.disks.size
      ? true
      : false; //COMPLETAR

  return (
    <>
      <div className="container">
        <GameOptionsComp
          disks={disks}
          reset={reset}
          setDisks={setDisks}
          solve={solve}
        />
        <div className="content">
          <TowerComp
            id={1}
            disks={tiles}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={2}
            disks={tilesTwo}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={3}
            disks={tilesThree}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
        </div>
        {winCondition && <WinMessageComp moveCount={moveCount} />}
        Movimientos: {moveCount}
      </div>
    </>
  );
};

export default App;
