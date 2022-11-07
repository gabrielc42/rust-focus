#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
  )]use std::fs::OpenOptions;
  use std::io::prelude::*;#[tauri::command]
  fn add_task(content: String) {
    let mut file = OpenOptions::new()
      .create(true)
      .append(true)
      .open("../tasks.txt")
      .expect("Error while opening the tasks file");
    writeln!(file, "{}", content).expect("Error while writing in the tasks file");
  }fn main() {
    tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![add_task])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
  }