package main

import (
	"fmt"
	"strings"
	"time"
)

func main() {
	tc := []struct {
		date, typ, time, who, where string
	}{
		{"2007.09.30", "marathon", "2h04m26s", "heile", "berlin"},
		{"2008.09.28", "marathon", "2h03m59s", "heile", "berlin"},
		{"2011.09.25", "marathon", "2h03m38s", "patrick", "berlin"},
		{"2013.09.29", "marathon", "2h03m23s", "wilson", "berlin"},
		{"2014.09.28", "marathon", "2h02m57s", "dennis", "berlin"},
		{"2018.09.16", "marathon", "2h01m39s", "eliud", "berlin"},
		{"2022.09.25", "marathon", "2h01m09s", "eliud", "berlin"},

		{"2007.02.07", "half", "58m53s", "samuel", "khaimah"},
		{"2007.03.17", "half", "58m33s", "samuel", "lahague"},
		{"2010.03.21", "half", "58m23s", "zersenay", "lisbon"},
		{"2018.10.28", "half", "58m18s", "abraham", "valencia"},
		{"2019.11.15", "half", "58m01s", "geoffrey", "copenhagen"},
		{"2020.12.06", "half", "57m32s", "kibiwott", "valencia"},
		{"2021.11.21", "half", "57m31s", "jacob", "lisbon"},

		{"2005.08.26", "ten", "26m17s", "kenenisa", "brussels"},
		{"2020.10.07", "ten", "26m11s", "joshua", "valencia"},

		{"2004.05.31", "five", "12m37s", "kenenisa", "hengelo"},
		{"2020.08.14", "five", "12m35s", "joshua", "monaco"},

		{"1996.09.01", "three", "7m20s", "daniel", "rieti"},

		{"1999.07.07", "mile", "3m43s", "hicham", "rome"},
		{"1998.07.14", "metric", "3m26s", "hicham", "rome"},
		{"1999.07.14", "onek", "2m11s", "noah", "rieti"},

		{"1997.08.24", "twolaps", "1m41.11s", "wilson", "cologne"},
		{"2010.08.22", "twolaps", "1m41.09s", "david", "berlin"},
		{"2010.08.29", "twolaps", "1m41.01s", "david", "rieti"},
		{"2012.08.09", "twolaps", "1m40.91s", "david", "london"},
	}
	fmt.Println("date,what,time,who,where")
	fmt.Println("i,s,f,s,s")
	for _, t := range tc {
		d, _ := time.Parse("2006.01.02 15:04:05", t.date+" 12:00:00")
		u, _ := time.ParseDuration(t.time)
		v := []string{d.Format("20060102"), t.typ, fmt.Sprintf("%.7f", u.Hours()), t.who, t.where}
		fmt.Println(strings.Join(v, ","))
	}
}
