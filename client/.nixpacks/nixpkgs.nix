{ pkgs ? import <nixpkgs> {} }:
pkgs.buildEnv {
  name = "nixpacks-env";
  paths = [
    pkgs.nodejs_22
  ];
}