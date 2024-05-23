/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/
const conversionStringList = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const charStrPts = [
    "1,2,5,8,10,13,15,18,21,22",				//0
    "1,2,3,7,12,16,17,22",						//1
    "0,1,2,3,5,11,12,18,20,21,22",				//2
    "1,2,5,8,12,18,20,21,22,23",				//3
    "3,5,6,7,8,9,10,13,16,18,22,23",			//4
    "0,1,2,8,10,11,12,15,20,21,22,23",	//5
    "1,2,3,5,9,11,12,13,17,23",				//6
    "0,6,12,18,20,21,22,23,24",				//7
    "1,2,3,5,9,12,13,15,19,21,22,23",		//8
    "1,7,11,12,13,15,19,21,22,23",				//9
    "0,3,5,8,10,11,12,13,15,18,21,22",			//A
    "0,1,2,5,8,10,12,15,18,20,21,22",		//B
    "1,2,3,5,10,15,21,22,23",					//C
    "0,1,2,5,8,10,13,15,18,20,21,22",			//D
    "0,1,2,5,10,11,12,15,20,21,22",		//E
    "0,5,10,11,12,15,20,21,22,23",				//F
    "1,2,3,5,9,10,13,14,21,22,23",				//G
    "0,3,5,8,10,11,12,13,15,18,20,23",			//H
    "0,1,2,6,11,16,20,21,22",					//I
    "1,2,5,8,13,18,20,21,22,23,24",			//J
    "0,3,5,7,10,11,15,17,20,23",				//K
    "0,1,2,3,5,10,15,20",						//L
    "0,4,5,9,10,12,14,15,17,19,21,23",		//M
    "0,4,5,8,9,10,12,14,15,16,19,24",		//N
    "1,2,5,8,10,13,15,18,21,22",				//O
    "0,5,10,11,12,18,20,21,22",				//P
    "2,3,6,7,10,13,15,18,21,22",				//Q
    "0,4,5,8,10,11,12,15,18,20,21,22",			//R
    "0,1,2,8,11,12,15,21,22,23",				//S
    "2,7,12,17,20,21,22,23,24",				//T
    "1,2,5,8,10,13,15,18,20,23",				//U
    "2,6,8,10,14,15,19,20,24",					//V	
    "1,3,5,7,9,10,12,14,15,19,20,24",		//W
    "0,3,5,8,11,12,15,18,20,23",				//X
    "2,7,12,16,18,20,24",						//Y
    "0,1,2,3,5,11,17,20,21,22,23",				//Z
    "1,2,3,4,5,8,10,13,16,17,18",				//a
    "0,1,2,5,8,10,11,12,15,20",				//b	
    "1,2,3,5,10,16,17,18",						//c
    "1,2,3,5,8,11,12,13,18,23",				//d
    "1,2,3,5,10,11,12,15,18,21,22",			//e
    "1,6,19,11,12,16,22,23",					//f
    "1,2,8,11,12,13,15,18,21,22,23",			//g
    "0,3,5,8,10,11,12,15,20",					//h
    "1,6,11,21",								//i
    "1,2,8,13,23",								//j
    "0,3,5,7,10,11,15,17,20",					//k
    "2,3,6,11,16,21",							//l
    "0,4,5,9,10,12,14,15,16,18,19",			//m
    "0,3,5,8,10,13,15,16,17",					//n
    "1,2,5,8,10,13,16,17",						//o
    "0,5,6,7,10,13,15,16,17",					//p
    "3,6,7,8,10,13,16,17,18",					//q
    "0,5,10,16,17,18",							//r
    "0,1,7,11,17,18",							//s
    "2,3,4,6,11,12,13,16,21",					//t
    "1,2,3,4,5,8,10,13,15,18",					//u
    "2,6,8,10,14,15,19",						//v
    "0,1,3,4,5,7,9,10,14,15,19",				//w
    "0,3,6,7,11,12,15,18",						//x
    "0,1,7,11,13,15,19",						//y
    "0,1,2,3,6,12,15,16,17,18"					//z
]

enum charFaceMap {
    //% block="Up"
    up,
    //% block="Upside down"
    down,
    //% block="Left"
    left,
    //% block="Right"
    right
}

/**
 * Custom blocks for LED Towers
 */
//% weight=0 color=#FAD000 icon="" groups="['Tower initialization','Command Send','Command Configuration','Command String','Coordinates','Other Parameters']"
namespace LEDTower {

    /**
     * LED Tower Initialization
     */
    //% block="LEDTower Initialization"
    //% group="Tower initialization"
    export function LEDTowerInit() {
        serial.redirectToUSB()
        serial.setRxBufferSize(80)
        radio.setGroup(77)
    }

    /**
     * Send Command to Receivers
     * @param cmd_to_send String Command to send
     * @param wait_ms ms to wait
     */
    //% block="LEDTower send Command $cmd_to_send and wait $wait_ms"
    //% cmd_to_send.shadow="get_command_str_to_send"
    //% wait_ms.shadow="timePicker" wait_ms.defl=50
    //% group="Command Send" weight=100
    export function sendLEDCommand(cmd_to_send: string, wait_ms: number) {
        radio.sendString(cmd_to_send)
        serial.writeLine(cmd_to_send)
        basic.pause(wait_ms)
    }

    /**
     * Get the string of Command to be sent
     * @param tower_pos tower position of x=[0,9] y=[0,2]
     * @param led_str Command String for z x y
     * @param color_rgb Color 
     */
    //% blockId="get_command_str_to_send"
    //% block="Get Command $tower_pos $led_str $color_rgb"
    //% inlineInputMode=external
    //% tower_pos.shadow="get_2D_tower_coor"
    //% led_str.shadow="get_char_str"
    //% color_rgb.shadow="get_colorpick"
    //% group="Command Configuration" weight=90
    export function getCommandToSend(tower_pos: string, led_str: string, color_rgb: number) {
        let _pos_str: string, _format_str: string, _combined_string: string
        let _color_R_val: number, _color_G_val: number, _color_B_val: number, _color_R_str: string, _color_G_str: string, _color_B_str: string, _color_com_str: string
        _pos_str = led_str.slice(0, -2)
        _format_str = led_str.slice(-2)
        _color_R_val = (color_rgb & 0xff0000) >> 16
        _color_G_val = (color_rgb & 0x00ff00) >> 8
        _color_B_val = (color_rgb & 0x0000ff)
        _color_R_str = conversionStringList.charAt(60 * (_color_R_val / 255))
        _color_G_str = conversionStringList.charAt(60 * (_color_G_val / 255))
        _color_B_str = conversionStringList.charAt(60 * (_color_B_val / 255))
        _color_com_str = "" + _color_R_str + _color_G_str + _color_B_str
        _combined_string = tower_pos + _pos_str + _color_com_str + _format_str
        //console.log(_combined_string)
        return _combined_string
    }

    /**
     * Get string from serial port or text to be sent
     * Dot|tx,ty|zz,x,y:zz,x,y:zz,x,y:zz,x,y:zz,x,y:zz,x,y|RRR,GGG,BBB;
     * Line|tx,ty|zz,x,y:zz,x,y:zz,x,y:zz,x,y:zz,x,y:zz,x,y|RRR,GGG,BBB;
     * Rect|v|zz,x,y,x,y:zz,x,y,x,y:zz,x,y,x,y:zz,x,y,x,y|RRR,GGG,BBB; 
     * Floor|tx,ty|zz:x,y:x,y:x,y:x,y:x,y:x,y:x,y:x,y:x,y:x,y:x,y:x,y|RRR,GGG,BBB;
     * Char|tx,ty|C|zz|D|RRR,GGG,BBB;
     * Show|tx,ty; Show|All; Clear|tx,ty; Clear|All;
     * where t;zz=[0,21];x=[0,4];y=[0,4];RRR=[0,255];GGG=[0,255];BBB=[0,255];C=['0','z'];D={'U','D','L','R'}
     * @param read_string serial string to be read
     */
    //% block="Get Command $read_string"
    //% read_string.defl="Dot|9,0|5,1,0:6,2,0:7,3,0:8,4,0:9,4,1:10,4,2|255,0,255"
    //% group="Command Configuration" weight=100
    export function getStringCommandToSend(read_string: string) {
        let _read_temp_Str: string, _store_cmd_arr: string[]
        let _temp_tower_arr: string[], _temp_tower_str: string, _temp_pts_arr: string[], _temp_pts_str: string, _temp_3D_arr: string[], _temp_color_arr: string[], _temp_color_num: number

        _read_temp_Str = read_string
        if (_read_temp_Str.indexOf(";") > 0 && _read_temp_Str.indexOf("|") > 0) {
            //split command
            _read_temp_Str = _read_temp_Str.substr(0, _read_temp_Str.length - 2)
            _store_cmd_arr = _read_temp_Str.split("|")
            if (_read_temp_Str.indexOf(",") > 0) {
                //Get tower string
                _temp_tower_arr = _store_cmd_arr[1].split(",")
                _temp_tower_str = get2DTowerCoor(parseInt(_temp_tower_arr[0]), parseInt(_temp_tower_arr[1]))
                if (_store_cmd_arr[0] == "Dot" || _store_cmd_arr[0] == "Line" || _store_cmd_arr[0] == "Floor" || _store_cmd_arr[0] == "Rect") {
                    //split points zxy
                    _temp_pts_arr = _store_cmd_arr[2].split(":")
                    _temp_pts_str = ""
                    if (_store_cmd_arr[0] == "Dot") {
                        for (let _tIndex = 0; _tIndex < _temp_pts_arr.length; _tIndex++) {
                            _temp_3D_arr = _temp_pts_arr[_tIndex].split(",")
                            _temp_pts_str += get3DCoor(parseInt(_temp_3D_arr[0]), parseInt(_temp_3D_arr[1]), parseInt(_temp_3D_arr[2]))
                        }
                        _temp_pts_str += "DU"
                    } else if (_store_cmd_arr[0] == "Line") {
                        for (let _tIndex = 0; _tIndex < _temp_pts_arr.length; _tIndex++) {
                            _temp_3D_arr = _temp_pts_arr[_tIndex].split(",")
                            _temp_pts_str += get3DCoor(parseInt(_temp_3D_arr[0]), parseInt(_temp_3D_arr[1]), parseInt(_temp_3D_arr[2]))
                        }
                        _temp_pts_str += "LU"
                    } else if (_store_cmd_arr[0] == "Floor") {
                        _temp_pts_str = conversionStringList.charAt(Math.constrain(parseInt(_temp_pts_arr[0]), 0, 21))
                        for (let _tIndex = 1; _tIndex < _temp_pts_arr.length; _tIndex++) {
                            _temp_3D_arr = _temp_pts_arr[_tIndex].split(",")
                            _temp_pts_str += get2DCoor(parseInt(_temp_3D_arr[0]), parseInt(_temp_3D_arr[1]))
                        }
                        _temp_pts_str += "ZU"
                    } else if (_store_cmd_arr[0] == "Rect") {
                        for (let _tIndex = 0; _tIndex < _temp_pts_arr.length; _tIndex++) {
                            _temp_3D_arr = _temp_pts_arr[_tIndex].split(",")
                            _temp_pts_str += getLEDOneRectString(parseInt(_temp_3D_arr[0]), get2DCoor(parseInt(_temp_3D_arr[1]), parseInt(_temp_3D_arr[2])), get2DCoor(parseInt(_temp_3D_arr[3]), parseInt(_temp_3D_arr[4])))
                        }
                        _temp_pts_str += "RU"
                    }
                    _temp_color_arr = _store_cmd_arr[3].split(",")
                    _temp_color_num = (((parseInt(_temp_color_arr[0]) << 16) & 0xFF0000) + ((parseInt(_temp_color_arr[1]) << 8) & 0x00FF00) + parseInt(_temp_color_arr[2]))
                    return getCommandToSend(_temp_tower_str, _temp_pts_str, _temp_color_num)
                } else if (_store_cmd_arr[0] == "Char") {
                    _temp_pts_str = getLEDCharString(_store_cmd_arr[2], parseInt(_store_cmd_arr[3]), _store_cmd_arr[4])
                    _temp_color_arr = _store_cmd_arr[5].split(",")
                    _temp_color_num = (((parseInt(_temp_color_arr[0]) << 16) & 0xFF0000) + ((parseInt(_temp_color_arr[1]) << 8) & 0x00FF00) + parseInt(_temp_color_arr[2]))
                    return getCommandToSend(_temp_tower_str, _temp_pts_str, _temp_color_num)
                } else if (_store_cmd_arr[0] == "Show") {
                    return setShowCommand(false, _temp_tower_str)
                } else if (_store_cmd_arr[0] == "Clear") {
                    return getClearCommand(false, _temp_tower_str)
                }
            } else {
                if (_store_cmd_arr[0] == "Show") {
                    return setShowCommand(true)
                } else if (_store_cmd_arr[0] == "Clear") {
                    return getClearCommand(true)
                }
            }
        }
        return ""
    }



    /**
     * Get string of Command for lighting off a tower
     * @param to_all_tower set if all tower to be lighted off
     * @param tower_pos (Optional) tower position if No
     */
    //% block="Get Clear Color on all Towers? $to_all_tower || but on Tower $tower_pos"
    //% expandableArgumentMode="toggle"
    //% to_all_tower.shadow="toggleYesNo" to_all_tower.defl=true
    //% tower_pos.shadow="get_2D_tower_coor"
    //% group="Command Configuration"
    export function getClearCommand(to_all_tower: boolean, tower_pos?: string) {
        let _combined_string: string
        _combined_string = "UCLEAR"
        if (!to_all_tower) {
            if (typeof tower_pos == 'undefined') { tower_pos = "U" }
            _combined_string = tower_pos + "CLEAR"
        }
        //console.log(_combined_string)
        return _combined_string
    }

    /**
     * Get string of Command for lighting on a tower
     * @param to_all_tower set if all tower to be lighted on
     * @param tower_pos (Optional) tower position if No
     */
    //% block="Get Show Color on all Towers? $to_all_tower || but on Tower $tower_pos"
    //% expandableArgumentMode="toggle"
    //% to_all_tower.shadow="toggleYesNo" to_all_tower.defl=true
    //% tower_pos.shadow="get_2D_tower_coor"
    //% group="Command Configuration"
    export function setShowCommand(to_all_tower: boolean, tower_pos?: string) {
        let _combined_string: string
        _combined_string = "UEOC"
        if (!to_all_tower) {
            if (typeof tower_pos == 'undefined') { tower_pos = "U" }
            _combined_string = tower_pos + "EOC"
        }
        //console.log(_combined_string)
        return _combined_string
    }

    /**
     * Get Character String from coordinates
     * @param char_to_show character to be shown ['0','z']
     * @param led_cz floor of character to be shown
     * @param face_dir direction of the character
     */
    //% blockId="get_char_str"
    //% block="Charactor: $char_to_show on floor $led_cz facing $face_dir"
    //% char_to_show.defl="A"
    //% led_cz.defl=21 led_cz.min=0 led_cz.max=21
    //% face_dir.shadow="get_direction_enum"
    //% group="Command String"
    export function getLEDCharString(char_to_show: string, led_cz: number, face_dir: string) {
        let _char_show_arr: string[], _chars_str: string, _char_pos: number, _face_dir_str: string, _combined_string: string
        _char_pos = conversionStringList.indexOf(char_to_show)
        _char_show_arr = charStrPts[_char_pos].split(",")
        _chars_str = ""
        for (let led_value of _char_show_arr) {
            _chars_str += conversionStringList.charAt(parseInt(led_value))
        }
        let convert_text = conversionStringList.charAt(Math.constrain(led_cz, 0, 21))
        _combined_string = convert_text + _chars_str + "Z" + _face_dir_str
        //console.log(_combined_string)
        return _combined_string
    }

    /**
     * Get Dots String from coordinates on mulit-floor
     * @param led_p1 position of LED dot
     * @param led_p2 (Optional) position of LED dot
     * @param led_p4 (Optional) position of LED dot
     * @param led_p5 (Optional) position of LED dot
     * @param led_p6 (Optional) position of LED dot
     */
    //% blockId="get_dots_str"
    //% block="Dots: $led_p1||$led_p2$led_p3$led_p4 $led_p5 $led_p6"
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% led_p1.shadow="get_3D_coor" led_p2.shadow="get_3D_coor" led_p3.shadow="get_3D_coor" led_p4.shadow="get_3D_coor" led_p5.shadow="get_3D_coor" led_p6.shadow="get_3D_coor"
    //% group="Command String"
    export function getLEDDotsString(led_p1: string, led_p2?: string, led_p3?: string, led_p4?: string, led_p5?: string, led_p6?: string) {
        let _combined_string = ""
        _combined_string = "" + led_p1
        if (typeof led_p2 != 'undefined') { _combined_string += led_p2 }
        if (typeof led_p3 != 'undefined') { _combined_string += led_p3 }
        if (typeof led_p4 != 'undefined') { _combined_string += led_p4 }
        if (typeof led_p5 != 'undefined') { _combined_string += led_p5 }
        if (typeof led_p6 != 'undefined') { _combined_string += led_p6 }
        _combined_string += "DU"
        //console.log(_combined_string)
        return _combined_string
    }



    /**
     * Get Lines String from coordinates on mulit-floor
     * @param led_l1 position of 2 points for LED line
     * @param led_l2 (Optional) position of 2 points for LED line
     * @param led_l3 (Optional) position of 2 points for LED line
     */
    //% blockId="get_lines_str"
    //% block="Lines: $led_l1||$led_l2$led_l3"
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% led_l1.shadow="get_1_line_str" led_l2.shadow="get_1_line_str" led_l3.shadow="get_1_line_str"
    //% group="Command String"
    export function getLEDLinesString(led_l1: string, led_l2?: string, led_l3?: string) {
        let _combined_string: string
        _combined_string = led_l1
        if (typeof led_l2 != 'undefined') { _combined_string += led_l2 }
        if (typeof led_l3 != 'undefined') { _combined_string += led_l3 }
        _combined_string += "LU"
        //console.log(_combined_string)
        return _combined_string
    }



    /**
     * Get Rectangles String from coordinates on same floor
     * @param led_r1  position of 2 corners to form rectangle on the same floor
     * @param led_r2  (Optional) position of 2 corners to form rectangle on the same floor
     * @param led_r3  (Optional) position of 2 corners to form rectangle on the same floor
     * @param led_r4  (Optional) position of 2 corners to form rectangle on the same floor
     */
    //% blockId="get_rects_str"
    //% block="Rectangles: $led_r1||$led_r2$led_r3$led_r4"
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% led_r1.shadow="get_1_rect_str" led_r2.shadow="get_1_rect_str" led_r3.shadow="get_1_rect_str" led_r4.shadow="get_1_rect_str"
    //% group="Command String"
    export function getLEDRectsString(led_r1: string, led_r2?: string, led_r3?: string, led_r4?: string) {
        let _combined_string: string
        _combined_string = led_r1
        if (typeof led_r2 != 'undefined') { _combined_string += led_r2 }
        if (typeof led_r3 != 'undefined') { _combined_string += led_r3 }
        if (typeof led_r4 != 'undefined') { _combined_string += led_r4 }
        _combined_string += "RU"
        //console.log(_combined_string)
        return _combined_string
    }

    /**
     * Get Dots from coordinates on the same floor 
     * @param led_rz floor to be set
     * @param led_p1 position of LED dot
     * @param led_p2 (Optional) position of LED dot
     * @param led_p3 (Optional) position of LED dot
     * @param led_p4 (Optional) position of LED dot
     * @param led_p5 (Optional) position of LED dot
     * @param led_p6 (Optional) position of LED dot
     * @param led_p7 (Optional) position of LED dot
     * @param led_p8 (Optional) position of LED dot
     * @param led_p9 (Optional) position of LED dot
     * @param led_p10 (Optional) position of LED dot
     * @param led_p11 (Optional) position of LED dot
     * @param led_p12 (Optional) position of LED dot
     */
    //% blockId="get_same_fl_str"
    //% block="Same Floor: $led_rz $led_p1||$led_p2 $led_p3 $led_p4 $led_p5 $led_p6 $led_p7 $led_p8 $led_p9 $led_p10 $led_p11 $led_p12"
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% led_rz.defl=0 led_rz.min=0 led_rz.max=21
    //% led_p1.shadow="get_2D_coor" led_p2.shadow="get_2D_coor" led_p3.shadow="get_2D_coor" led_p4.shadow="get_2D_coor" led_p5.shadow="get_2D_coor" led_p6.shadow="get_2D_coor" led_p7.shadow="get_2D_coor" led_p8.shadow="get_2D_coor" led_p9.shadow="get_2D_coor" led_p10.shadow="get_2D_coor" led_p11.shadow="get_2D_coor" led_p12.shadow="get_2D_coor"
    //% group="Command String"
    export function getLEDSameFloorString(led_rz: number, led_p1?: string, led_p2?: string, led_p3?: string, led_p4?: string, led_p5?: string, led_p6?: string, led_p7?: string, led_p8?: string, led_p9?: string, led_p10?: string, led_p11?: string, led_p12?: string) {
        let _combined_string: string
        let convert_text = conversionStringList.charAt(Math.constrain(led_rz, 0, 21))
        _combined_string = convert_text + led_p1
        if (typeof led_p2 != 'undefined') { _combined_string += led_p2 }
        if (typeof led_p3 != 'undefined') { _combined_string += led_p3 }
        if (typeof led_p4 != 'undefined') { _combined_string += led_p4 }
        if (typeof led_p5 != 'undefined') { _combined_string += led_p5 }
        if (typeof led_p6 != 'undefined') { _combined_string += led_p6 }
        if (typeof led_p7 != 'undefined') { _combined_string += led_p7 }
        if (typeof led_p8 != 'undefined') { _combined_string += led_p8 }
        if (typeof led_p9 != 'undefined') { _combined_string += led_p9 }
        if (typeof led_p10 != 'undefined') { _combined_string += led_p10 }
        if (typeof led_p11 != 'undefined') { _combined_string += led_p11 }
        if (typeof led_p12 != 'undefined') { _combined_string += led_p12 }
        _combined_string += "ZU"
        //console.log(_combined_string)
        return _combined_string
    }

    /**
     * Get 2D coordinate XY of Towers in 10x3
     * @param dot_x tower position x=[0,9]
     * @param dot_y tower position y=[0,2]
     */
    //% blockId="get_2D_tower_coor"
    //% block="Tower $dot_x $dot_y"
    //% dot_x.defl=0 dot_x.min=0 dot_x.max=9
    //% dot_y.defl=0 dot_y.min=0 dot_y.max=2
    //% group="Coordinates"  advanced=true
    export function get2DTowerCoor(dot_x: number, dot_y: number): string {
        let _dot_num = Math.constrain(dot_x, 0, 9) + Math.constrain(dot_y, 0, 2) * 10
        let convert_text = conversionStringList.charAt(_dot_num)
        return convert_text
    }

    /**
     * Get 2D coordinate XY of LED in 5x5
     * @param dot_x LED position x=[0,4]
     * @param dot_y LED position y=[0,4]
     */
    //% blockId="get_2D_coor"
    //% block="LED $dot_x $dot_y"
    //% dot_x.defl=0 dot_x.min=0 dot_x.max=4
    //% dot_y.defl=0 dot_y.min=0 dot_y.max=4
    //% group="Coordinates"  advanced=true
    export function get2DCoor(dot_x: number, dot_y: number): string {
        let _dot_num = Math.constrain(dot_x, 0, 4) + Math.constrain(dot_y, 0, 4) * 5
        let convert_text = conversionStringList.charAt(_dot_num)
        return convert_text
    }

    /**
     * Get 3D coordinate ZXY of LED in 22x5x5
     * @param dot_z LED position z=[0,21]
     * @param dot_x LED position x=[0,4]
     * @param dot_y LED position x=[0,4]
     */
    //% blockId="get_3D_coor"
    //% block="LED $dot_z $dot_x $dot_y"
    //% dot_z.defl=0 dot_z.min=0 dot_z.max=21
    //% dot_x.defl=0 dot_x.min=0 dot_x.max=4
    //% dot_y.defl=0 dot_y.min=0 dot_y.max=4
    //% group="Coordinates"  advanced=true
    export function get3DCoor(dot_z: number, dot_x: number, dot_y: number): string {
        let _dot_num = Math.constrain(dot_x, 0, 4) + Math.constrain(dot_y, 0, 4) * 5
        let convert_text = conversionStringList.charAt(Math.constrain(dot_z, 0, 21)) + conversionStringList.charAt(_dot_num)
        return convert_text
    }

    /**
     * Get an LED Line from 2 points
     * @param led_p1 LED 1 position
     * @param led_p2 LED 2 position
     */
    //% blockId="get_1_line_str"
    //% block="$led_p1 $led_p2" advanced=true
    //% inlineInputMode=inline
    //% led_p1.shadow="get_3D_coor" led_p2.shadow="get_3D_coor"
    //% group="Coordinates"  advanced=true
    export function getLEDOneLineString(led_p1: string, led_p2: string) {
        let _combined_string: string
        _combined_string = led_p1 + led_p2
        return _combined_string
    }

    /**
     * Get an LED Rectangle from 2 points diagonally
     * @param led_rz floor to be set
     * @param led_p1 LED 1 position
     * @param led_p2 LED 2 position
     */
    //% blockId="get_1_rect_str"
    //% block="$led_rz $led_p1 $led_p2"
    //% inlineInputMode=inline
    //% led_rz.defl=0 led_rz.min=0 led_rz.max=21
    //% led_p1.shadow="get_2D_coor" led_p2.shadow="get_2D_coor"
    //% group="Coordinates"  advanced=true
    export function getLEDOneRectString(led_rz: number, led_p1: string, led_p2: string) {
        let _combined_string: string
        let convert_text = conversionStringList.charAt(Math.constrain(led_rz, 0, 21))
        _combined_string = convert_text + led_p1 + led_p2
        return _combined_string
    }


    /**
     * Get Enum of direction and convert to String
     * @param face_dir direction of a charactor to face ['U','D','L','R']
     */
    //% blockId="get_direction_enum"
    //% block="$face_dir" 
    //% group="Other Parameters"advanced=true
    export function getCharDirEnum(face_dir: charFaceMap) {
        let _face_dir_str: string
        switch (face_dir) {
            case 0:
                _face_dir_str = 'U'
                break
            case 1:
                _face_dir_str = 'D'
                break
            case 2:
                _face_dir_str = 'L'
                break
            case 3:
                _face_dir_str = 'R'
                break
            default:
                _face_dir_str = 'U'
                break
        }
        return _face_dir_str
    }

    /**
     * Get number refer to a color from deflaut color picker
     * @param color_num color number [0x000000, 0xFFFFFF]
     */
    //% blockId="get_colorpick"
    //% block="Color $color_num" 
    //% color_num.shadow="colorNumberPicker"
    //% group="Other Parameters" advanced=true
    export function getColorPickerString(color_num: number) {
        return color_num
    }

}