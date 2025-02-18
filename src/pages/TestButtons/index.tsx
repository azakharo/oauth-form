import {LoadingButton} from '@mui/lab';
import {Box} from '@mui/material';

export const TestButtons = () => {
  return (
    <Box p={4} width={600} marginX="auto">
      <table
        style={{
          width: '100%',
          borderSpacing: '0 1em',
        }}
      >
        <thead>
          <tr>
            <th></th>
            <th>Primary</th>
            <th>Secondary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial</td>
            <td>
              <LoadingButton color="primary">Получить код</LoadingButton>
            </td>
            <td>
              <LoadingButton variant="outlined">Получить код</LoadingButton>
            </td>
          </tr>

          <tr>
            <td>Loading</td>
            <td>
              <LoadingButton color="primary" loading>
                Получить код
              </LoadingButton>
            </td>
            <td>
              <LoadingButton variant="outlined" loading>
                Получить код
              </LoadingButton>
            </td>
          </tr>

          <tr>
            <td>Disabled</td>
            <td>
              <LoadingButton color="primary" disabled>
                Получить код
              </LoadingButton>
            </td>
            <td>
              <LoadingButton variant="outlined" disabled>
                Получить код
              </LoadingButton>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};
