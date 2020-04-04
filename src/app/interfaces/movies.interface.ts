import { MovieDates } from './movie-dates.interface';
import { MovieResult } from './movies-result.interface';

export interface Movies {
    results:       MovieResult[];
    page:          number;
    total_results: number;
    dates:         MovieDates;
    total_pages:   number;
}