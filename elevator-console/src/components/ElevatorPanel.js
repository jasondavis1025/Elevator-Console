import classes from "./ElevatorPanel.module.css";
import React, { useState, useEffect } from "react";

const ElevatorPanel = (props) => {
	const [button1IsActive, setButton1IsActive] = useState(false);
	const [button2IsActive, setButton2IsActive] = useState(false);
	const [button3IsActive, setButton3IsActive] = useState(false);
	const [button4IsActive, setButton4IsActive] = useState(false);
	const [currentFloor, setCurrentFloor] = useState(1);
	const [floorQueue, setFloorQueue] = useState([]);
	const [triangleState, setTriangleState] = useState("");

	useEffect(() => {
		function triangleChange(floorQueue, currentFloor) {
			let thefloorgoal = +floorQueue[0];
			console.log(currentFloor);
			if (thefloorgoal > currentFloor) {
				setTriangleState("up");
			} else if (thefloorgoal < currentFloor) {
				setTriangleState("down");
			} else {
				setTriangleState("");
			}
		}
		triangleChange(floorQueue, currentFloor);
		if (floorQueue.length > 0) {
			const identifier = setTimeout(() => {
				function floorChange(floorQueue) {
					let thefloor = +floorQueue[0];
					switch (thefloor) {
						case 1:
							setCurrentFloor((currentFloor) => (currentFloor = 1));
							setButton1IsActive((active) => (active = false));
							break;
						case 2:
							setCurrentFloor((currentFloor) => (currentFloor = 2));
							setButton2IsActive((active) => (active = false));
							break;
						case 3:
							setCurrentFloor((currentFloor) => (currentFloor = 3));
							setButton3IsActive((active) => (active = false));
							break;
						case 4:
							setCurrentFloor((currentFloor) => (currentFloor = 4));
							setButton4IsActive((active) => (active = false));
							break;
						default:
							break;
					}
				}
				floorChange(floorQueue);
				setFloorQueue((currentQueue) => {
					let newQueue = currentQueue.slice(1);
					return newQueue;
				});
			}, 2000);

			return () => {
				clearTimeout(identifier);
				console.log("queue cleaned!");
			};
		}
	}, [floorQueue, currentFloor]);

	//Button Handler Functions
	const button1Handler = (event) => {
		setButton1IsActive((active) => (active = true));
		setFloorQueue((previousQueue) => [...previousQueue, event.target.id]);
	};

	const button2Handler = (event) => {
		setButton2IsActive((active) => (active = true));
		setFloorQueue((previousQueue) => [...previousQueue, event.target.id]);
	};

	const button3Handler = (event) => {
		setButton3IsActive((active) => (active = true));
		setFloorQueue((previousQueue) => [...previousQueue, event.target.id]);
	};

	const button4Handler = (event) => {
		setButton4IsActive((active) => (active = true));
		setFloorQueue((previousQueue) => [...previousQueue, event.target.id]);
	};

	return (
		<div className={classes.outerbox}>
			<div className={classes.topbox}>
				<div className={classes.topleftbox}>
					<h1>Display</h1>
					<div>Floor Queue: {floorQueue}</div>
					<div>Current Floor: {currentFloor} </div>
				</div>
				<div className={classes.toprightbox}>
					<div
						className={`${classes.triangleup} ${
							triangleState === "up" ? classes.activatedup : ""
						}`}
					></div>
					<div className={classes.topmidbox}></div>
					<div
						className={`${classes.triangledown} ${
							triangleState === "down" ? classes.activateddown : ""
						}`}
					></div>
				</div>
			</div>
			<div className={classes.bottombox}>
				Interactive Console
				<div className={classes.consolebox}>
					<button
						id="1"
						className={`${classes.buttondesign} ${
							button1IsActive === true ? classes.activated : ""
						}`}
						onClick={button1Handler}
						disabled={button1IsActive}
					>
						1
					</button>
					<button
						id="2"
						className={`${classes.buttondesign} ${
							button2IsActive === true ? classes.activated : ""
						}`}
						onClick={button2Handler}
						disabled={button2IsActive}
					>
						2
					</button>
				</div>
				<div className={classes.consolebox}>
					<button
						id="3"
						className={`${classes.buttondesign} ${
							button3IsActive === true ? classes.activated : ""
						}`}
						onClick={button3Handler}
						disabled={button3IsActive}
					>
						3
					</button>
					<button
						id="4"
						className={`${classes.buttondesign} ${
							button4IsActive === true ? classes.activated : ""
						}`}
						onClick={button4Handler}
						disabled={button4IsActive}
					>
						4
					</button>
				</div>
			</div>
		</div>
	);
};

export default ElevatorPanel;
