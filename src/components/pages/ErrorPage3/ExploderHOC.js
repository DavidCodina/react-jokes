
import { withErrorBoundary }          from 'react-error-boundary';
import { Exploder, ExploderFallback } from '../../shared';


export const ExploderHOC = withErrorBoundary(Exploder, {
  FallbackComponent: ExploderFallback,
  onError(error, info){ console.log('Error info available for error logging service.'); },
  onReset(){            console.log('Component was reset.'); }
});
