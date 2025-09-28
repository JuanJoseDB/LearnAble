export const courses = [
  {
    id: '1',
    title: 'Inclusive Classroom Basics (UDL)',
    short: 'Universal Design for Learning: multiple ways to engage, represent and express.',
    video: 'media/udl_basics.mp4',
    videoLow: 'media/udl_basics_low.mp4',
    audio: 'media/udl_basics.mp3',
    captions: 'media/udl_basics.vtt',
    easyText: `UDL helps everyone learn. Give choices: how to learn (watch, read, listen) and how to show learning (draw, record audio, build, write).`,
    transcript: `This lesson introduces Universal Design for Learning (UDL). You will learn to offer multiple means of engagement, representation and action/expression. We cover choice boards, visual supports, and flexible assessments.`,
    activities: [
      { title: 'Visual Schedule Starter', steps: ['Create a 4-step visual schedule (icons + words).','Model the routine.','Ask for feedback: which step needs clearer visuals?'] },
      { title: 'Choice Board (Engagement)', steps: ['Pick one goal (“show what you learned”).','Create 4 options: draw, record audio, build, write.','Students choose and present.'] }
    ],
    badges: ['Captions','Transcript','Keyboard','High Contrast','Easy Read','Audio']
  },
  {
    id: '2',
    title: 'Communication & AAC 101',
    short: 'Basics of Augmentative and Alternative Communication to support speech and language.',
    video: 'media/aac_101.mp4',
    videoLow: 'media/aac_101_low.mp4',
    audio: 'media/aac_101.mp3',
    captions: 'media/aac_101.vtt',
    easyText: `AAC helps people communicate. Use core words (I, you, want, go, stop, more, like, help, finished). Model sentences; accept any communication.`,
    transcript: `AAC supports communication for people with limited speech. We introduce core vocabulary, modeling (Aided Language Input), and how to respond to all communication attempts.`,
    activities: [
      { title: 'Core Words Mini-Board', steps: ['Make a 3x3 board with core words.','Model 3 sentences in class.','Invite students to respond in any way.'] },
      { title: 'I Do – We Do – You Do', steps: ['Teacher models with board.','Practice together describing a picture.','Students try in pairs; count attempts.'] }
    ],
    badges: ['Captions','Transcript','Keyboard','Easy Read','Audio']
  },
  {
    id: '3',
    title: 'Sensory-Friendly Learning Strategies',
    short: 'Support attention and regulation with low-stimulus and predictable environments.',
    video: 'media/sensory_strategies.mp4',
    videoLow: 'media/sensory_strategies_low.mp4',
    audio: 'media/sensory_strategies.mp3',
    captions: 'media/sensory_strategies.vtt',
    easyText: `Reduce noise and visual overload. Use predictable routines, calm corners, and short movement breaks.`,
    transcript: `You will learn simple sensory-friendly strategies: reduce noise and visual overload, predictable routines, calm corners, and movement breaks.`,
    activities: [
      { title: 'Calm Corner Plan', steps: ['Pick a quiet spot; add timer, feelings chart, soft object.','Teach when/how to use (2–5 min).','Students reflect: what helps me calm down?'] },
      { title: 'Movement Breaks', steps: ['Prepare 3-minute break with 3 options.','Schedule every 20–30 minutes.','Track on-task time before/after.'] }
    ],
    badges: ['Captions','Transcript','Keyboard','High Contrast','Easy Read','Audio']
  }
];
