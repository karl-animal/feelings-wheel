import type { Course } from "../types";

// Curriculum from Bennie's LASPCA / Kevin Duggan classes.
// Names + brief criterion summaries are paraphrased; the homework PDFs remain
// the private reference for full instructions. Obedience track only — no
// housetraining. Do not regenerate this text from any other source.
export const COURSES: Course[] = [
  {
    id: "pm",
    name: "Puppy Manners",
    source: "Puppy I · Kevin Duggan",
    weeks: [
      {
        num: "1",
        ex: [
          { id: "pm1-watch", name: "Watch", note: "Lure nose-to-eyes, mark the instant eyes meet. Build low → high distraction." },
          { id: "pm1-sit", name: "Sit", note: "Cue once and wait — never repeat the cue. Fade the lure." },
          { id: "pm1-handling", name: "Body handling", note: "Handle THEN treat: ears, mouth, restraint hug, feet/toes, tail." },
          { id: "pm1-social", name: "Socialization", note: "People, car rides, sights/sounds, friendly pups. Make novelty positive." },
          { id: "pm1-leaveit", name: "Leave It (closed hand)", note: "Mark the moment he turns away from your closed fist." },
          { id: "pm1-bite", name: "Play biting", note: "Allow soft mouthing; time-out the hard bites. Build bite inhibition." },
        ],
      },
      {
        num: "2",
        ex: [
          { id: "pm2-watch", name: "Watch (hand signal)", note: "Empty-hand signal, 10 in a row, then add verbal — verbal THEN signal." },
          { id: "pm2-sit", name: "Sit (hand signal)", note: "Fade lure to an upward hand signal; reward from the other hand." },
          { id: "pm2-down", name: "Down", note: "Lure between the paws, then fade to a hand signal." },
          { id: "pm2-handling", name: "Body handling (more)", note: "Add teeth exam, tongue, longer restraint." },
          { id: "pm2-leaveit", name: "Leave It (food on floor)", note: "Treat 2 ft away; mark a 1-second hesitation, then build duration." },
          { id: "pm2-bowl", name: "Food bowl bonuses", note: "Lift bowl, add a bonus, return it — once per meal." },
        ],
      },
      {
        num: "3",
        ex: [
          { id: "pm3-muzzle", name: "Muzzle training", note: "Basket muzzle; lure nose through, treat while it's in place." },
          { id: "pm3-come", name: "Come when called", note: "\"Here!\" + happy talk, pay big. 2×/day. Don't poison the cue." },
          { id: "pm3-airplane", name: "Airplane game", note: "Sit-stay; lower treat slowly, reset on any jump." },
          { id: "pm3-downstay", name: "Down-stay (food distraction)", note: "Treat at nose level; mark a 1-second hold." },
          { id: "pm3-leaveit", name: "Leave It (tossed)", note: "Simulate a dropped treat; mark the hesitation." },
          { id: "pm3-social", name: "Socialization", note: "Two new places this week — crowds and kids ideal." },
        ],
      },
      {
        num: "4",
        ex: [
          { id: "pm4-words", name: "Adding words", note: "Sit/Down/Watch: verbal → signal → behavior → reward." },
          { id: "pm4-come", name: "Come when called", note: "Fade food, stand up straight, reps of five." },
          { id: "pm4-target", name: "Hand targeting", note: "Nose to a stationary hand, 10 in a row, then add \"Touch.\"" },
          { id: "pm4-bungee", name: "Bungee stays", note: "Builds distance, not duration. +1 step at a time, bungee return." },
          { id: "pm4-antijump", name: "Anti-jump sit-stay", note: "Proof the sit against your jumping/flapping temptations." },
          { id: "pm4-exchange", name: "Object exchanges", note: "\"Thank you,\" swap toy for a treat, give the toy back." },
        ],
      },
      {
        num: "5",
        ex: [
          { id: "pm5-vet", name: "Sit-stay for vet exam", note: "Hold a sit through ears, paws, muzzle, mouth, tail handling." },
          { id: "pm5-findit", name: "Find It!", note: "Toss treats, move past a distraction with his nose on the ground." },
          { id: "pm5-circle", name: "Walk-around down-stay", note: "Circle him; +1 step only after 5 clean reps." },
          { id: "pm5-leaveit", name: "Leave It (moving past)", note: "Walk past a planted temptation; reward as you move away." },
          { id: "pm5-wait", name: "Wait", note: "At doorways: release only on a 1-second pause." },
        ],
      },
    ],
  },
  {
    id: "bm3",
    name: "Basic Manners 3",
    source: "LASPCA · Kevin Duggan",
    weeks: [
      {
        num: "1",
        ex: [
          { id: "bm1-stand", name: "Stand from sit", note: "Lure up to standing, fade to signal, add \"Stand.\"" },
          { id: "bm1-llw", name: "Advanced loose-leash walking", note: "Engagement at side, more steps between rewards, auto check-ins." },
          { id: "bm1-finish", name: "Intro to finish", note: "Lure around behind into heel/hip; pay heavily when aligned." },
          { id: "bm1-distance", name: "Cueing at a distance", note: "Step back, ask down. +1 step only after 5 in a row." },
          { id: "bm1-bed", name: "Go to bed", note: "Verbal + signal, build duration, add handler movement." },
          { id: "bm1-bedstay", name: "Bed stay around movement", note: "Hold the bed while you take a few steps nearby." },
        ],
      },
      {
        num: "2",
        ex: [
          { id: "bm2-stand", name: "Stand from down", note: "Lure forward into a stand, fade to signal, add \"Stand.\"" },
          { id: "bm2-sit", name: "Sit from down", note: "Clean position changes, minimal extra movement." },
          { id: "bm2-finish", name: "Finish with hand signal", note: "Fade the lure to a signal; precise hip position." },
          { id: "bm2-distance", name: "Cueing at increased distance", note: "Sit/down/stand from farther; verbal before signal." },
          { id: "bm2-llw", name: "LLW with distractions", note: "Turns, stops, direction changes; reward held position." },
          { id: "bm2-bed", name: "Longer bed stays", note: "More duration + light distractions (dropped treats, movement)." },
        ],
      },
      {
        num: "3",
        ex: [
          { id: "bm3-down", name: "Down from stand", note: "Lure stand → down, fade to signal, add \"Down.\"" },
          { id: "bm3-finish", name: "Finish on verbal cue", note: "\"Finish\" before the signal; build speed and fluency." },
          { id: "bm3-distdur", name: "Cueing with distance & duration", note: "Mix positions; hold stays before the next cue." },
          { id: "bm3-heel", name: "Improved heel position", note: "Tighter turns, slower pace, short formal heel stretches." },
          { id: "bm3-place", name: "Extended place work", note: "Move farther from the bed; brief out-of-sight if ready." },
          { id: "bm3-dogs", name: "Focus around moving dogs", note: "Hold the bed while dogs/people move; reward disengagement." },
        ],
      },
    ],
  },
  {
    id: "bb",
    name: "Beyond Basics",
    source: "LASPCA · Kevin Duggan",
    weeks: [
      {
        num: "1",
        ex: [
          { id: "bb1-watch", name: "Watch (Focus)", note: "Empty-hand nose-to-eyes, mark eye contact. Inside → yard → walks." },
          { id: "bb1-verbals", name: "Using verbals", note: "Cue, then signal, reward in position. Watch/Sit on walks with mild distraction." },
          { id: "bb1-hi", name: "Go Say Hi", note: "Helper 10 ft away lures a sit. Reset jumping with \"too bad.\"" },
          { id: "bb1-llw", name: "Loose leash walking", note: "Treats at nose level center; walk backwards to draw him in, reward often." },
          { id: "bb1-recall", name: "Recalls away from meals", note: "Dinner visible but out of reach; \"Here!\" once, run together to the bowl." },
          { id: "bb1-hip", name: "Hip position", note: "Treat on nose, draw a \"C\" to your left hip, lift slightly into a sit." },
        ],
      },
      {
        num: "2",
        ex: [
          { id: "bb2-watch", name: "Watch with distractions", note: "Let him notice the distraction, cue Watch, reward eye contact." },
          { id: "bb2-hip", name: "Hip position", note: "Guide to your side, fade the lure to a hand signal." },
          { id: "bb2-leash", name: "Leash walking", note: "At your side; rotate to keep position, back up to reset." },
        ],
      },
      {
        num: "3",
        ex: [
          { id: "bb3-llw", name: "Loose leash walking", note: "Reward frequently; back up to reset; smooth, controlled walking." },
          { id: "bb3-hip", name: "Hip (verbal cue)", note: "\"Hip,\" wait, signal only if needed. Verbal before signal." },
          { id: "bb3-mat", name: "Go to mat", note: "Lure on, add signal, work toward lure independence." },
          { id: "bb3-stay", name: "Stay (duration)", note: "Build gradually; reset cleanly on a break." },
          { id: "bb3-hi", name: "Go Say Hi", note: "Cue the greeting, reward calm, pull away/reset on jumping." },
        ],
      },
      {
        num: "4",
        ex: [
          { id: "bb4-hi", name: "Go Say Hi", note: "Loose leash, no jumping, reset as needed." },
          { id: "bb4-premack", name: "Premack", note: "Call away from a reward, then release back to it." },
          { id: "bb4-mat", name: "Go to mat", note: "Lead with the verbal cue first." },
          { id: "bb4-llwleave", name: "LLW + Leave It", note: "Walk past food on a loose leash." },
          { id: "bb4-heel", name: "Intro heeling", note: "Start from hip, reward the position." },
        ],
      },
      {
        num: "5",
        ex: [
          { id: "bb5-heel", name: "Heeling", note: "Practice turns and duration." },
          { id: "bb5-mat", name: "Mat work", note: "Add duration and distractions." },
          { id: "bb5-stay", name: "Stay", note: "Build real-world duration." },
          { id: "bb5-premack", name: "Premack recall", note: "Call away from real distractions." },
          { id: "bb5-greet", name: "Greetings", note: "Polite greetings with a delay." },
          { id: "bb5-llw", name: "Loose leash walking", note: "Practice around distractions." },
        ],
      },
    ],
  },
];

// Flat list of every exercise id, in curriculum order.
export const ALL_EXERCISE_IDS: string[] = COURSES.flatMap((c) =>
  c.weeks.flatMap((w) => w.ex.map((e) => e.id))
);

// Lookup: exercise id -> { name, course }.
export const EX_BY_ID: Record<string, { name: string; course: string }> = {};
COURSES.forEach((c) =>
  c.weeks.forEach((w) =>
    w.ex.forEach((e) => {
      EX_BY_ID[e.id] = { name: e.name, course: c.name };
    })
  )
);
