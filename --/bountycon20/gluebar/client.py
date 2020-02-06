#!/usr/bin/env python3

import argparse
import json
import sys
from urllib import parse, request

parser = argparse.ArgumentParser(description = "Glue.bar API client")
parser.add_argument("--url", dest="apiUrl", help="API endpoint location", required=True)
parser.add_argument("--key", dest="apiKey", help="API key", required=True)
subparsers = parser.add_subparsers(dest="command")

parser_get = subparsers.add_parser("get", help="get glue by ID")
parser_get.add_argument("glueId", help="ID of glue to retrieve")

parser_browse = subparsers.add_parser("browse", help="show glues according to filters")
parser_browse.add_argument("--author", dest="author", help="filter by author")
parser_browse.add_argument("--title", dest="title", help="filter by title")

args = parser.parse_args()

if args.command == "get":
  params = parse.urlencode({
    "key": args.apiKey,
    "action": "get",
    "id": args.glueId
  })
elif args.command == "browse":
  filters = []
  if args.author:
    filters.append(["author", args.author])
  if args.title:
    filters.append(["title", args.title])
  params = parse.urlencode({
    "key": args.apiKey,
    "action": "browse",
    "filters": json.dumps(filters)
  })
else:
  print("No command selected!")
  sys.exit(1)

req = request.Request(args.apiUrl, params.encode("ascii"))
response = json.load(request.urlopen(req))

if not response or not response["success"]:
  print("Request failed!")
  sys.exit(1)

data = response["data"]

if args.command == "get":
  if response["data"] is None:
    print("Glue not found!")
    sys.exit(1)
  print("Glue found:")
  print("===========")
  print("")
  print("Created: " + data["created_at"])
  print("Author:  " + data["author"])
  print("Title:   " + data["title"])
  print("")
  print(data["content"])
else:
  print("Results:")
  print("========")
  print("link             | author | title")
  for entry in data:
    print(entry["link"] + " | " + entry["author"] + " | " + entry["title"])
