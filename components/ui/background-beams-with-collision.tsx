"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [beams, setBeams] = useState<Array<{
    initialX: number;
    translateX: number;
    duration: number;
    repeatDelay: number;
    delay: number;
    className: string;
  }>>([]);

  useEffect(() => {
    setBeams(
      Array.from({ length: 60 }, () => ({
        initialX: Math.random() * 2000,
        translateX: 0,
        duration: Math.random() * 1.5 + 1,
        repeatDelay: 0,
        delay: Math.random() * 3,
        className: `h-${Math.floor(Math.random() * 3 + 2)}`,
      }))
    );
  }, []);

  return (
    <div
      ref={parentRef}
      className={cn(
        "absolute inset-0 z-0",
        className
      )}
    >
      {beams.map((beam, idx) => (
        <CollisionMechanism
          key={idx}
          beamOptions={beam}
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
          parentRef={parentRef as React.RefObject<HTMLDivElement>}
        />
      ))}
      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 w-full inset-x-0 pointer-events-none h-1"
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement>;
    parentRef: React.RefObject<HTMLDivElement>;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-20px",
          translateX: beamOptions.initialX || "0px",
          rotate: 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "1800px",
            translateX: beamOptions.initialX || "0px",
            rotate: 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute left-0 top-0 w-[0.5px] rounded-full bg-gradient-to-b from-white/30 via-white/20 to-transparent backdrop-blur-[0.2px] shadow-[0_0_1px_rgba(255,255,255,0.2)]",
          beamOptions.className
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    initialX: number;
    initialY: number;
    directionX: number;
    directionY: number;
  }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 5 }, (_, index) => ({
        id: index,
        initialX: 0,
        initialY: 0,
        directionX: Math.floor(Math.random() * 16 - 8),
        directionY: Math.floor(Math.random() * -16 - 4),
      }))
    );
  }, []);

  return (
    <div {...props} className={cn("absolute z-50 h-0.5 w-0.5", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute -inset-x-1.5 top-0 m-auto h-0.5 w-2 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[0.5px]"
      ></motion.div>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{ x: particle.initialX, y: particle.initialY, opacity: 1 }}
          animate={{
            x: particle.directionX,
            y: particle.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 0.4 + 0.2, ease: "easeOut" }}
          className="absolute h-0.5 w-0.5 rounded-full bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-[0.2px] shadow-[0_0_1px_rgba(255,255,255,0.1)]"
        />
      ))}
    </div>
  );
}; 