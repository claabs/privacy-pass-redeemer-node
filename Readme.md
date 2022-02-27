# privacy-pass-redeemer-node

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/claabs/privacy-pass-redeemer-node/Unit%20test%20and%20build)
[![Coverage Status](https://coveralls.io/repos/github/claabs/privacy-pass-redeemer-node/badge.svg?branch=master)](https://coveralls.io/github/claabs/privacy-pass-redeemer-node?branch=master)

A Node.js port of the [privacypass Python module](https://github.com/SergeBakharev/privacypass). See [its Readme](https://github.com/SergeBakharev/privacypass#readme) for more details on its background.

## Usage

```typescript
import axios from 'axios';
// 1. Obtain token from browser storage; pass into your program
const token: PrivacyPassToken = {
  input: [
    22, 154, 58, 240, 238, 122, 125, 23, 99, 108, 170, 68, 67, 115, 3, 224, 100, 163, 56, 223,
    34, 31, 212, 171, 39, 162, 217, 243, 224, 10, 16, 196,
  ],
  factor: '0xc1ddb8bce81bafe390578ba7e94ceaa9faabc48386aa58aa616f571256888cd9',
  blindedPoint:
    'BPmmboTSxbY3TYOIJljLkARBBhcLDuCQNohijoiEuqMLf6pmbTVwjOBIBZjmHwhp7WB9+Zjj9mYPmba4lf5xv7k=',
  unblindedPoint:
    'BCiOcZYeSZtH7zDCvYHqfkPqMwYlzIyuTSF2QW1XRysApO5QUOOADlWTez+9dkpokJsXRztt9u8OVP/GRS2lYbo=',
  signed: {
    blindedPoint:
      'BKB12x2wRsdv685koZOnlpJLbTfI8whIhtdVdAF/YmBpj1YqmJOApK5MCCs91WV1Dk74C0C1aXIIv+kcf86m/fQ=',
    unblindedPoint:
      'BK7d7UTyt4M5wKrAi8G1fC74CxHoNf7Jb711TkLsUPB1I7gfk3+LRkHuUDsRBqM3/3YY+thxy7xRoFEhxsLSeWM=',
  },
};

// 2. Create redemption token header
const redemptionTokenHeader = getRedemptionHeader(
  token,
  'https://example.com/some/path',
  'GET'
);

// 3. Make a request with the redemtion token. The token is expired after use
const resp = await axios.get('https://example.com/some/path', { headers: redemptionTokenHeader });
```

