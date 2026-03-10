#!/usr/bin/env python3
"""通过 D-Bus 控制 gnome-calculator"""

import sys
import os

import subprocess
import time

def open_calculator_with_number(number):
    """用 --equation 打开计算器并预填数字"""
    try:
        # 先杀掉旧的
        subprocess.run(['pkill', '-f', 'gnome-calculator'], 
                     capture_output=True, timeout=2)
        time.sleep(0.5)
        
        # 使用 dbus-launch 确保有 display 权限
        env = os.environ.copy()
        env['DISPLAY'] = ':0'
        
        # 打开计算器并预填表达式
        proc = subprocess.Popen(['gnome-calculator', '--equation', str(number)],
                        env=env,
                        stdout=subprocess.DEVNULL,
                        stderr=subprocess.DEVNULL)
        time.sleep(1)
        print(f"✅ 已打开计算器，显示: {number}")
        return True
    except Exception as e:
        print(f"❌ 失败: {e}")
        return False

if __name__ == '__main__':
    number = sys.argv[1] if len(sys.argv) > 1 else '520'
    open_calculator_with_number(number)
