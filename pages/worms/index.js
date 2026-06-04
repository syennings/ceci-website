import useSWR from "swr";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./worms.module.css";

const WORDS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
  "one", "two", "three", "four", "five",
  "Apple", "Pear", "Plum", "Strawberry", "Orange",
  "hungry", "full", "small", "BIG", "Beautiful",
];

function generateLayout(hidingIndex) {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
  return shuffled.map((word, i) => ({
    word,
    top: 2 + Math.random() * 90,
    left: 2 + Math.random() * 80,
    rotation: -12 + Math.random() * 24,
    fontSize: 14 + Math.floor(Math.random() * 100),
    verticalOffset: -30 + Math.floor(Math.random() * 60), // random vertical nudge for flow layout
    marginLeft: Math.floor(Math.random() * 20),
    isHiding: i === hidingIndex,
  }));
}

export default function WormGame() {
  const { data: worms, isLoading } = useSWR("/api/worms/");
  const wormsRef = useRef(worms); // ref so setTimeout always has fresh data
  const [layout, setLayout] = useState([]);
  const [hidingIndex, setHidingIndex] = useState(0);
  const [currentWorm, setCurrentWorm] = useState(null);
  const [found, setFound] = useState(false);
  const [wiggling, setWiggling] = useState(false);

  // keep ref in sync
  useEffect(() => { wormsRef.current = worms; }, [worms]);

  function setupRound() {
    const wormList = wormsRef.current;
    if (!wormList || wormList.length === 0) return;
    const hiding = Math.floor(Math.random() * WORDS.length);
    setHidingIndex(hiding);
    setLayout(generateLayout(hiding));
    setCurrentWorm(wormList[Math.floor(Math.random() * wormList.length)]);
    setFound(false);
    setWiggling(false);
  }

  useEffect(() => {
    if (!worms || worms.length === 0) return;
    setupRound();
  }, [worms]);

  const handleWordClick = (index) => {
    if (found || index !== hidingIndex) return;
    setFound(true);
    setWiggling(true);
    // after wiggle, start a fresh round
    setTimeout(() => setupRound(), 2000);
  };

  if (isLoading || !currentWorm || layout.length === 0) return <p>... opening a can of worms</p>;

  return (
    <div className={styles.game}>
      <p className={styles.hint}>Find the shy worm hiding behind the letters.</p>
      {/* desktop: scattered absolute layout */}
      <div className={styles.scattered}>
        {layout.map((item, i) => (
          <div
            key={i}
            className={styles.wordWrapper}
            style={{
              top: `${item.top}%`,
              left: `${item.left}%`,
              transform: `rotate(${item.rotation}deg)`,
              zIndex: item.isHiding ? 100 : 1,
            }}
            onClick={() => handleWordClick(i)}
          >
            {item.isHiding && (
              <div
                className={`${styles.wormSpot} ${found ? styles.wormVisible : ""} ${wiggling ? styles.wiggle : ""}`}
                onClick={(e) => { e.stopPropagation(); handleWordClick(i); }}
              >
                <Image
                  src={currentWorm.url}
                  alt={currentWorm.label || "worm"}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain", pointerEvents: "none" }}
                />
              </div>
            )}
            <span className={styles.word} style={{ fontSize: `${item.fontSize}px` }}>
              {item.word}
            </span>
          </div>
        ))}
      </div>

      {/* mobile: one big inline text block, words flow naturally */}
      <div className={styles.flow}>
        {layout.map((item, i) => (
          <span
            key={i}
            className={styles.flowWord}
            style={{
              fontSize: `${item.fontSize}px`,
              position: "relative",
              top: `${item.verticalOffset}px`,
              marginLeft: `${item.marginLeft}px`,
              zIndex: item.isHiding ? 100 : 1,
            }}
            onClick={() => handleWordClick(i)}
          >
            {item.isHiding && (
              <span
                className={`${styles.wormSpot} ${found ? styles.wormVisible : ""} ${wiggling ? styles.wiggle : ""}`}
                onClick={(e) => { e.stopPropagation(); handleWordClick(i); }}
              >
                <Image
                  src={currentWorm.url}
                  alt={currentWorm.label || "worm"}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain", pointerEvents: "none" }}
                />
              </span>
            )}
            {item.word}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
