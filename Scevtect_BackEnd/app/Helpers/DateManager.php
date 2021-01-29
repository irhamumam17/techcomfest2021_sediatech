<?php 
namespace App\Helpers;

class DateManager
{
    public static function getDate($from_date , $to_date)
    {
    	function toInt($array) {
    		$arr = [];
    		foreach ($array as $value) {
    			array_push($arr, (int)$value);
    		}
    		return $arr;
    	}  
    	$from = toInt(explode('-' , $from_date));
    	$to = toInt(explode('-', $to_date));

    	$collection = collect([]);

    	if($from[0] === $to[0]) {
    		// jika tahunnya sama;
    		if($from[1] === $to[1]) {
    			for ($i=$from[2]; $i <= $to[2]; $i++) { 
    				$collection->push([
    					'day' => $i,
    					'month' => $to[1],
    					'year' => $to[0],
    				]);
    			}
    		} else {
    			// jika bullannya beda;
    			for ($j=$from[1]; $j <= $to[1]; $j++) { 
    				$last_date = toInt(explode('-' ,date('Y-m-t' , strtotime(date('Y-'.$j.'-d')))));
                    ($j === $from[1]) ? $start = $from[2] : $start = 1;
                    ($j === $to[1]) ? $finish = $to[2] : $finish = $last_date[2];
    				for ($i=$start; $i <= $finish; $i++) { 
    					$collection->push([
                            'day'   => $i,
                            'month' => $j,
                            'year'  => $to[0],
    					]);
    				}
    			}
    		}
    	} else {
    		for ($k=$from[0]; $k <= $to[0]; $k++) { 
    			if($k === $from[0]) {
    				for ($j=$from[1]; $j <= 12; $j++) { 
	    				$last_date = toInt(explode('-' ,date('Y-m-t' , strtotime(date('Y-'.$j.'-d')))));
                        ($j === $from[1]) ? $start = $from[2] : $start = 1;
                        ($j === $to[1]) ? $finish = $to[2] : $finish = $last_date[2];
                        for ($i=$start; $i <= $finish; $i++) { 
                            $collection->push([
                                'day'   => $i,
                                'month' => $j,
                                'year'  => $to[0],
                            ]);
                        }
    				}
    			} else {
    				for ($j=1; $j <= $to[1]; $j++) { 
    					$last_date = toInt(explode('-' ,date('Y-m-t' , strtotime(date('Y-'.$j.'-d')))));
                        ($j === $from[1]) ? $start = $from[2] : $start = 1;
                        ($j === $to[1]) ? $finish = $to[2] : $finish = $last_date[2];
                        for ($i=$start; $i <= $finish; $i++) { 
                            $collection->push([
                                'day'   => $i,
                                'month' => $j,
                                'year'  => $to[0],
                            ]);
                        }
    				}
    			}
    		}
    	}
        return $collection;
    }

    public static function getMonth($number)
    {
        $months = ['Januari' , 'Februari' , 'Maret' , 'April' , 'Mei' , 'Juni' , 'Juli' , 'Agustus' , 'September' , 'Oktober' , 'November' , 'Desember'];
        return $months[(int)$number - 1];
    }

    public static function getDay($day)
    {
        $days = [
            'Sunday'    => 'Minggu',
            'Monday'    => 'Senin',
            'Tuesday'   => 'Selasa',
            'Wednesday' => 'Rabu',
            'Thursday'  => 'Kamis',
            'Friday'    => 'Jumat',
            'Saturday'  => 'Sabtu',
        ];

        return $days[$day];
    }

    public static function idFormat($date) 
    {
        $date = explode('-' , $date);
        $day = self::getDay($date[0]);
        $month = self::getMonth((int)$date[2]);

        $newFormat = $day . ', '. $date[1] . ' ' . $month . ' ' . $date[3];  
        return $newFormat;
    }
}
