# Assessment
Predict which fee, or sometimes also called 'rate' that should be used when sending transactions.

# Requirements

* Node.js >= v14.0

## Installation

1. Install yarn

```bash
npm install --global yarn
```

2. Clone this repository and cd into the folder:

```bash
git clone https://github.com/mampudi/assessment.git
```
```bash
cd assessment
```
```bash
yarn
```
## Test
```bash
yarn test
```
## Invoke

Please make sure to copy the .env.examples file and change it to a .env and replace they key with your infura key.

Run yarn dev to start the service
```bash
yarn dev
```

Run the curl command to get the fee estimate
```bash
curl http://localhost:1337/getfeeestimate
```

You can use postman to execute the API calls.