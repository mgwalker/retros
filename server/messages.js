module.exports = Object.freeze({
  action: Object.freeze({
    createRetro: 'create retro',
    joinChannel: 'join channel',
    addUser: 'add user',
    startRetro: 'start retro',
    takeOwnership: 'take ownership',
    announceOwnership: 'you are owner',
    setUsername: 'set username',
    waitForStart: 'wait for start'
  }),
  retro: Object.freeze({
    starting: 'starting retro',
    polling: 'polling',
    collectAnswers: 'collect answers',
    submitAnswers: 'submit answers',
    voting: 'voting',
    collectVotes: 'collect votes',
    submitVotes: 'submit votes',
    tenSecondWarning: '10-second warning',
    results: 'results'
  })
});
