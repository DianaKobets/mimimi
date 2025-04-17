import { Layer, Stage, Rect, Line } from "react-konva";
import { useState, useEffect } from "react";
import { db } from "../firebase" 
import { ref, onValue, set } from 'firebase/database';


type LineType = {
    points: number[];
    color: string; 
};

export const DrawingCanvas = () => {
    const [lines, setLines] = useState<LineType[]>([]);
    const [currentLine, setCurrentLine] = useState<number[]>([]);
    const [color, setColor] = useState('#ff0000');

    const handleMouseDown = (e: any) => {
        const pos = e.target.getStage().getPointerPosition();
        setCurrentLine([pos.x, pos.y]);
    };

    const handleMouseMove = (e: any) => {
        if (currentLine.length === 0) return;
        const pos = e.target.getStage().getPointerPosition();
        setCurrentLine(prev => [...prev, pos.x, pos.y]);
    }

    const handleMouseUp = () => {
        const newLine = { points: currentLine, color };
        saveLinesToFirebase(newLine);
        setCurrentLine([]);
      };

    useEffect(() =>{
        const linesRef = ref(db, 'lines');
        onValue(linesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setLines(data);
        });

        const handleBeforeUnload = () => {
            const linesRef = ref(db, 'drawings');
            set(linesRef, lines);
          };
          
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
      }, [lines])

    const saveLinesToFirebase = (newLine: LineType) => {
        const linesRef = ref(db, 'lines');
        set(linesRef, [...lines, newLine]);
    }

    const adaptiveWidth = window.innerWidth*0.7;
    const adaptiveHeight = window.innerHeight*0.6;

    return (
        <div className="drawing-canvas">
            <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
            />
            <div className="canvas">
                <Stage
                    width={adaptiveWidth}
                    height={adaptiveHeight}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    >
                    <Layer>
                        <Rect width={adaptiveWidth} height={adaptiveHeight} fill="#FFFFE0" className="stage"/>
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke={line.color}
                                strokeWidth={3}
                                tension={0.7}
                                lineCap="round"
                            />
                        ))}
                        {currentLine.length > 0 && 
                        <Line
                            points={currentLine}
                            stroke={color}
                            strokeWidth={3}
                            lineCap="round"
                        />}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}

