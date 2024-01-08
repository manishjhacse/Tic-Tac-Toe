import React from "react";

export default function PlayerName(props) {
  const values = props.values;
  console.log(values.player1);
  function handleStart() {
    console.log(values.player1 + " " + values.player2);
    if (values.player1 === null || values.player2 === null) {
      alert("Please Enter Players Name");
      return;
    }
    values.setGameStart(true);
  }
  return (
    <div className="text-white overflow-hidden w-full px-6">
      {!values.gameStart ? (
        <div className="flex flex-col justify-center h-screen w-screen items-center gap-y-3 ">
          <label className="flex sm:flex-row flex-col  justify-center sm:items-center gap-2">
            <span>Player 1:</span>
            <input
              type="text"
              value={values.player1 === null ? "" : values.player1}
              className="bg-black text-white px-2 py-1 rounded-md border border-slate-300 outline-none"
              placeholder="Enter Name"
              onChange={(e) => {
                values.setPlayer1(e.target.value);
              }}
            />
          </label>
          <label className="flex sm:flex-row flex-col  justify-center sm:items-center gap-2">
            <span>Player 2:</span>
            <input
              type="text"
              value={values.player2 === null ? "" : values.player2}
              className="bg-black text-white px-2 py-1  rounded-md border border-slate-300 outline-none"
              placeholder="Enter Name"
              onChange={(e) => {
                values.setPlayer2(e.target.value);
              }}
            />
          </label>
          <button
            className="bg-slate-300 text-black px-4 font-bold uppercase py-1 rounded-sm"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center  items-start gap-y-3 w-full">
          <div className="flex gap-2 uppercase text-xl">
            <span>{values.player1} (X) =</span>
            <span>{values.player1win}</span>
          </div>
          <div className="flex gap-2 uppercase text-xl">
            <span>{values.player2} (0) =</span>
            <span>{values.player2win}</span>
          </div>
        </div>
      )}
    </div>
  );
}
