import boto3

ec2 = boto3.client("ec2")


def handler(event, context):
    # タグ AutoStop=true で、起動中のEC2だけを探す
    resp = ec2.describe_instances(
        Filters=[
            {"Name": "tag:AutoStop", "Values": ["true"]},
            {"Name": "instance-state-name", "Values": ["running"]},
        ]
    )
    ids = [i["InstanceId"] for r in resp["Reservations"] for i in r["Instances"]]
    if ids:
        ec2.stop_instances(InstanceIds=ids)
    print(f"stopped: {ids}")
    return {"stopped": ids}
