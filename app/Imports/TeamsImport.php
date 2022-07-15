<?php
namespace App\Imports;
use App\Models\Teams;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TeamsImport implements ToCollection
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        return new Team([
            'name'     => $row[0],
            'full_name'    => $row[1],
            'foundation'    => $row[2],
            'stadium'    => $row[3],
            'city'    => $row[4],
            'details_history'    => $row[5],
            'flag'    =>$row[6],
            'regional_federation'    =>$row[7],
            'country'    =>$row[8],
            'trophies'    =>$row[9],
        ]);
    }
}
