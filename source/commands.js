const getOs = `cat /etc/os-release`;
const installV2rayUbuntuStep1 = `
sudo apt-get update
sudo apt-get upgrade
`;
const installV2rayUbuntuStep2 = `
sudo apt-get install curl -y
bash <(curl -s -L https://git.io/v2ray.sh)
`;
const installV2rayStep3 = `1
`;
const installV2rayStep4 = `3
`;
const installV2rayStep6 = `N
`;
const installV2rayStep7 = `N
`;
module.exports = { getOs, installV2rayUbuntuStep1, installV2rayUbuntuStep2, installV2rayStep3, installV2rayStep4, installV2rayStep6, installV2rayStep7 };
