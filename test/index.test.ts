import { getRedemptionHeader, getRedemptionToken, PrivacyPassToken } from '../src';

jest.setTimeout(15000);
describe('Basic redemption', () => {
  it('should redeem a token', async () => {
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

    const redemptionToken = getRedemptionToken(token, 'https://example.com/some/path', 'GET');

    expect(redemptionToken).toEqual(
      'eyJ0eXBlIjoiUmVkZWVtIiwiY29udGVudHMiOlsiRnBvNjhPNTZmUmRqYktwRVEzTUQ0R1NqT044aUg5U3JKNkxaOCtBS0VNUT0iLCJEeXF0VmxaNWpzdS9HVnh1NUtGRm81bzdMbW5HRHc1bW1xdGtHN1dEQzU0PSIsImV5SmpkWEoyWlNJNkluQXlOVFlpTENKb1lYTm9Jam9pYzJoaE1qVTJJaXdpYldWMGFHOWtJam9pYVc1amNtVnRaVzUwSW4wPSJdfQ=='
    );
  });

  it('should redeem a header', async () => {
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

    const redemptionTokenHeader = getRedemptionHeader(
      token,
      'https://example.com/some/path',
      'GET'
    );

    expect(redemptionTokenHeader).toEqual({
      'challenge-bypass-token':
        'eyJ0eXBlIjoiUmVkZWVtIiwiY29udGVudHMiOlsiRnBvNjhPNTZmUmRqYktwRVEzTUQ0R1NqT044aUg5U3JKNkxaOCtBS0VNUT0iLCJEeXF0VmxaNWpzdS9HVnh1NUtGRm81bzdMbW5HRHc1bW1xdGtHN1dEQzU0PSIsImV5SmpkWEoyWlNJNkluQXlOVFlpTENKb1lYTm9Jam9pYzJoaE1qVTJJaXdpYldWMGFHOWtJam9pYVc1amNtVnRaVzUwSW4wPSJdfQ==',
    });
  });

  it('should throw on invalid token', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token: any = {
      input: [
        22, 154, 58, 240, 238, 122, 125, 23, 99, 108, 170, 68, 67, 115, 3, 224, 100, 163, 56, 223,
        34, 31, 212, 171, 39, 162, 217, 243, 224, 10, 16, 196,
      ],
      factor: '0xc1ddb8bce81bafe390578ba7e94ceaa9faabc48386aa58aa616f571256888cd9',
      blindedPoint:
        'BPmmboTSxbY3TYOIJljLkARBBhcLDuCQNohijoiEuqMLf6pmbTVwjOBIBZjmHwhp7WB9+Zjj9mYPmba4lf5xv7k=',
      unblindedPoint:
        'BCiOcZYeSZtH7zDCvYHqfkPqMwYlzIyuTSF2QW1XRysApO5QUOOADlWTez+9dkpokJsXRztt9u8OVP/GRS2lYbo=',
    };

    expect(() => getRedemptionHeader(token, 'https://example.com/some/path', 'GET')).toThrowError(
      'Unsigned token is used to derive a MAC key'
    );
  });

  it('should throw on invalid URL', async () => {
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

    expect(() => getRedemptionHeader(token, 'invalid', 'GET')).toThrowError('Invalid URL: invalid');
  });
});
