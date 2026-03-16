import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type WaitlistEntry = {
    name : Text;
    email : Text;
  };

  module WaitlistEntry {
    public func compare(a : WaitlistEntry, b : WaitlistEntry) : Order.Order {
      switch (Text.compare(a.email, b.email)) {
        case (#equal) { Text.compare(a.name, b.name) };
        case (order) { order };
      };
    };
  };

  let entries = Map.empty<Text, WaitlistEntry>();

  public shared ({ caller }) func joinWaitlist(name : Text, email : Text) : async () {
    if (entries.containsKey(email)) {
      Runtime.trap("Email already registered!");
    };

    let entry : WaitlistEntry = {
      name;
      email;
    };

    entries.add(email, entry);
  };

  public query ({ caller }) func isEmailRegistered(email : Text) : async Bool {
    entries.containsKey(email);
  };

  public query ({ caller }) func getWaitlistCount() : async Nat {
    entries.size();
  };

  public query ({ caller }) func getAllEntries() : async [WaitlistEntry] {
    entries.values().toArray().sort();
  };
};
