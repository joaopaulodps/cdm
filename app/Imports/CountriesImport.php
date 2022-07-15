<?php
namespace App\Imports;
use App\Models\Country;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
class CountriesImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Country([
            'name'     => $row[0],
            'federal_capital'    => $row[1],
            'continent'    => $row[2],
            'coin'    => $row[3],
            'slug'    => $row[4],
            'continent_id'    => $row[5],
            'flag'    =>$row[6],
            'top_country'    =>$row[7],
            'official_language'    =>$row[8],
        ]);
    }
}