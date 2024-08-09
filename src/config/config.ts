export const Rewards = {
  firstInviteReward: { coin: 500, energy: 5, dailyEnergy: 20 },
  inviteReward3: { coin: 2500, energy: 10, dailyEnergy: 30 },
  inviteReward5: { coin: 5000, energy: 15, dailyEnergy: 50 },
  inviteReward10: { coin: 1000, energy: 50, dailyEnergy: 100 },
  registrationReward: { coin: 500, energy: 5, dailyEnergy: 20 },
};

export const calculateInviteRewards = (
  inviteCount: number,
): { coin?: number; energy?: number; dailyEnergy?: number } => {
  switch (inviteCount) {
    case 0:
      return Rewards.firstInviteReward;
    case 2:
      return Rewards.inviteReward3;
    case 4:
      return Rewards.inviteReward5;
    case 9:
      return Rewards.inviteReward10;
    default:
      return {};
  }
};
